export const runtime = "nodejs";
export async function GET() {
  return Response.json({ error:"legacy_pack_retired", catalog:"/api/mobile/catalog", download:"/api/mobile/download", message:"全資格の目次と有料会員向け資格別ダウンロードへ移行しました。" },{status:410,headers:{"Cache-Control":"no-store"}});
}
