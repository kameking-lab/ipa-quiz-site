"""Read-only public HTTP audit; never submits forms or requests ads/AI APIs."""
import argparse
import concurrent.futures
import datetime
import hashlib
import json
from html.parser import HTMLParser
from pathlib import Path
import urllib.error
import urllib.request
from urllib.parse import urljoin, urlparse


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.hidden = 0
        self.in_head = False
        self.in_main = False
        self.text = []
        self.main = []
        self.links = set()
        self.canonical = []
        self.robots = []
        self.ad_scripts = []
        self.account = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ('script', 'style'): self.hidden += 1
        if tag == 'head': self.in_head = True
        if tag == 'main': self.in_main = True
        if tag == 'a' and a.get('href'): self.links.add(a['href'])
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical.append(a.get('href'))
        if tag == 'meta' and a.get('name') in ('robots', 'googlebot'): self.robots.append(a)
        if tag == 'meta' and a.get('name') == 'google-adsense-account': self.account.append(a.get('content'))
        if tag == 'script' and 'adsbygoogle' in a.get('src', ''): self.ad_scripts.append({'src': a['src'], 'in_head': self.in_head})

    def handle_endtag(self, tag):
        if tag in ('script', 'style'): self.hidden = max(0, self.hidden - 1)
        if tag == 'head': self.in_head = False
        if tag == 'main': self.in_main = False

    def handle_data(self, data):
        if not self.hidden:
            self.text.append(data)
            if self.in_main: self.main.append(data)


def fetch(url, ua='ADK-read-only-audit/1.0'):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': ua})
        try:
            response = urllib.request.urlopen(req, timeout=45)
        except urllib.error.HTTPError as error:
            response = error
        body = response.read()
        html = body.decode('utf-8', errors='replace')
        page = Page()
        page.feed(html)
        main = ' '.join(' '.join(page.main).split())
        return {'url': url, 'final_url': response.url, 'status': response.status,
                'x_robots_tag': response.headers.get('X-Robots-Tag'),
                'content_type': response.headers.get('Content-Type'),
                'sha256': hashlib.sha256(body).hexdigest(), 'bytes': len(body),
                'canonical': page.canonical, 'robots': page.robots,
                'ad_scripts': page.ad_scripts, 'account': page.account,
                'main_chars': len(main), 'main_text': main,
                'links': sorted(page.links),
                'plain_body': html if not 'html' in response.headers.get('Content-Type', '') else None}
    except Exception as error:
        return {'url': url, 'error': str(error)}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--base', default='https://www.kakomon-ai.jp')
    parser.add_argument('--out', required=True)
    args = parser.parse_args()
    paths = ['/', '/ads.txt', '/robots.txt', '/sitemap.xml', '/privacy', '/operator', '/about', '/contact', '/terms', '/transparency', '/sources', '/exams', '/blog', '/fe', '/ap', '/fp3', '/shika-ishi', '/chosashi', '/fe/2025-cbt', '/fp3/2026-published', '/blog/fe-hinnshutsu-ronten-toppu10', '/blog/fe-jisseki-mondai-bunseki', '/q/fe/2025-cbt/kamoku-b/q1', '/q/fp3/2026-published/gakka/q11', '/q/shika-ishi/2026-annual/mondai-a/q5', '/q/chosashi/2025-autumn/am/q11', '/quiz?exam=fe', '/adk-missing-page-20261104']
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        rows = list(pool.map(fetch, [args.base + p for p in paths]))
        # Check ordinary internal links exposed by the sampled pages, bounded to
        # avoid crawling the whole corpus; sample question routes separately.
        links = sorted({urljoin(args.base, link).split('#')[0] for row in rows for link in row.get('links', [])
                        if link.startswith('/') and not link.startswith('//') and not link.startswith('/api/')})
        checked = {r['url'] for r in rows}
        questions = [link for link in links if '/q/' in link]
        sample = questions[::max(1, len(questions) // 50)][:50]
        other = [link for link in links if '/q/' not in link and not '/quiz' in link and '?' not in link][:150]
        rows.extend(pool.map(fetch, [link for link in sample + other if link not in checked]))
    bots = [fetch(args.base + path, agent) for agent in ['Googlebot', 'Mediapartners-Google'] for path in ['/', '/robots.txt', '/q/fe/2025-cbt/kamoku-b/q1']]
    data = {'timestamp_utc': datetime.datetime.now(datetime.timezone.utc).isoformat(), 'base': args.base,
            'scope': 'bounded HTTP sample, no JS/real Google IP/account access; main_chars is not a quality verdict', 'pages': rows, 'bot_user_agent_checks': bots}
    Path(args.out).parent.mkdir(parents=True, exist_ok=True)
    Path(args.out).write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({'pages': len(rows), 'statuses': {str(s): sum(r.get('status') == s for r in rows) for s in {r.get('status') for r in rows}}, 'errors': [r for r in rows if r.get('error')], 'output': args.out}, ensure_ascii=False))


if __name__ == '__main__': main()
