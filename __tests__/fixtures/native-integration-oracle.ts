import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

// Source-derived SHA-256 oracle: historical refs are provenance, not CI dependencies.
// No question text is duplicated. All normalized fields, nested reasons and arrays
// are hashed, preserving array order while ignoring object property order.
function canonical(value: unknown): string {
 if(value===null||typeof value==='string'||typeof value==='boolean'||typeof value==='number'&&Number.isFinite(value))return JSON.stringify(value);
 if(Array.isArray(value))return '['+value.map(canonical).join(',')+']';
 if(typeof value==='object')return '{'+Object.keys(value as object).sort().map(key=>JSON.stringify(key)+':'+canonical((value as Record<string,unknown>)[key])).join(',')+'}';
 throw new Error('Unsupported oracle value');
}
export function runtimeFingerprint(value: unknown): string {
 return createHash('sha256').update(canonical(value)).digest('hex');
}
export function normalizedTextSha256(text: string): string {
 return createHash('sha256').update(text.replace(/\r\n/g,'\n')).digest('hex');
}
export function repositoryTextSha256(relativePath: string): string {
 return normalizedTextSha256(readFileSync(path.join(process.cwd(),relativePath),'utf8'));
}
export function sourceFilesUnder(roots: readonly string[]): string[] {
 const walk=(relative: string): string[]=>readdirSync(path.join(process.cwd(),relative),{withFileTypes:true}).flatMap(entry=>{
  const child=relative+'/'+entry.name;
  return entry.isDirectory()?walk(child):[child];
 });
 return roots.flatMap(walk).sort();
}
export const integrationOracle = {
  "schemaVersion": 1,
  "derivation": "Pinned from historical producer Git blobs; sourceCommit is provenance only, never fetched by tests. Canonical JSON sorts object keys and preserves arrays; native-b uses the unchanged shared normalizer.",
  "aviation338": {
    "sourceCommit": "8fc0646606da456b8d49d107964f200237636d3b",
    "sourceRoots": [
      "data/questions/riku-tech1",
      "data/questions/maritime4",
      "data/questions/land-special1"
    ],
    "originalCount": 338,
    "normalizedRuntimeSha256": "24d0999b5f3ff6f6b072269628c9049eb69e8ccd77c5a9a2bca93a887dd4fa12",
    "priorPlayerSha256": "e73a120530b71c4714a49837ffaedc62d58ceea3e36f8bc5bbaf6638e09354ea",
    "files": [
      {
        "path": "components/quiz/NativeBAnswer.tsx",
        "sha256": "ccbe67befbb0b1aa31f7c05966d4619e5e597fb2156e3c0e8b474629f107003a"
      },
      {
        "path": "components/quiz/QuestionAnswerCard.tsx",
        "sha256": "c59994606a5e4852b266a7b389a664e26d7b5c1cc6a1135eff3cf3d9e31632bf"
      },
      {
        "path": "components/quiz/stream/StreamQuizPlayer.tsx",
        "sha256": "a7797ce35a43b338fb3fe7052a7b783e535ac2f0d23a11928094beb9ca8c6378"
      },
      {
        "path": "data/questions/land-special1/2026-february-houki.json",
        "sha256": "8cc769ee2ea55f383d9eee9b9133050bf2493e2d5444344a5e51e14a2879b399"
      },
      {
        "path": "data/questions/land-special1/2026-february-kogaku.json",
        "sha256": "9a185c61f46f3730f6965fe504cba9f3dcc976b8ddb3a81fef44a75419559710"
      },
      {
        "path": "data/questions/land-special1/2026-june-houki.json",
        "sha256": "a759c0c618dd0e3063f3009ae42251a47c67729e365f957621203632661b793c"
      },
      {
        "path": "data/questions/land-special1/2026-june-kogaku.json",
        "sha256": "7781655c3d6b22432fc4f7bd51c1eb9ca8ad1abc4ce9e7c563f4c4516de76cb1"
      },
      {
        "path": "data/questions/land-special1/index.ts",
        "sha256": "a6bf6d104dd1c0bd979da6d2313a2e50d6451c54b9094ad8c070cf19bc3bb458"
      },
      {
        "path": "data/questions/maritime4/index.ts",
        "sha256": "7177f7a5715c0967daf5d4b59d8f8742bcf6b678d990863575c513a4fdc2d41e"
      },
      {
        "path": "data/questions/maritime4/two-sittings.json",
        "sha256": "10782ece7662670fcfbc8c915c4319c9fe44c96420bdc3d074dfdac78d2638ae"
      },
      {
        "path": "data/questions/riku-tech1/2026-january-houki.json",
        "sha256": "12f59da58bff2e5c967f2688fcf7a19b744ae7802b197d764d13cf6e2fd62bdf"
      },
      {
        "path": "data/questions/riku-tech1/2026-january-kiso.json",
        "sha256": "1baaca0a81f131e3fd4ca6f84f6577542b5c9c51e42d11b723c56ae4a2b77029"
      },
      {
        "path": "data/questions/riku-tech1/2026-january-kogaku-a.json",
        "sha256": "b529860a0a2fffecc5454aed966e6dcdbf4d834acdb1403cae80815ba2d7f857"
      },
      {
        "path": "data/questions/riku-tech1/2026-january-kogaku-b.json",
        "sha256": "1757738660edb8acf07538ccb3a11dfe83e71020046d337e64bb2434215bb6dd"
      },
      {
        "path": "data/questions/riku-tech1/2026-july-houki.json",
        "sha256": "fb558807c473627d50562acb91c9be8dffacad669e352d62210ed5a82b21e476"
      },
      {
        "path": "data/questions/riku-tech1/2026-july-kiso.json",
        "sha256": "7656faa9cdc2aa91225c29e686b409b4ea9b9f911da2aac788d6e187c43856f5"
      },
      {
        "path": "data/questions/riku-tech1/2026-july-kogaku-a.json",
        "sha256": "4722f09f1230aa438a22f06ffbe6df36c94c657138449c8daf233b9f68dfae13"
      },
      {
        "path": "data/questions/riku-tech1/2026-july-kogaku-b.json",
        "sha256": "072a78993c6196ecb4fce27df6e6096faf159fe6ae57d88fa80d9510a07063a9"
      },
      {
        "path": "data/questions/riku-tech1/index.ts",
        "sha256": "1655cae4b4e9f088d3209dbddf0e526d42177ba227d263733685bf5492554666"
      },
      {
        "path": "lib/questions/native-b.ts",
        "sha256": "addac75138c34c225a06b3d43ddfb8ebee4fa15d66354991e595fbf74d6c2231"
      }
    ]
  },
  "producers": {
    "amateur1": {
      "sourceCommit": "ef6c757feef3e1454119c42b5b721a1cc35c8a3d",
      "sourceJsonPins": [
        {
          "path": "data/questions/amateur1/two-sittings.json",
          "sha256": "99e15c4c9affd65d39ba1e8ab6b2d7d514692829e351c12df7b68072fe893a1f"
        }
      ],
      "originalCount": 120,
      "normalizedRuntimeSha256": "8da12389d95870d404baf89aa4b775d9e1bd94061abb0c1f89942ac9e40ee1a9"
    },
    "maritime-special1": {
      "sourceCommit": "34196216168dc36cf2fe287b4559bd51edabc450",
      "sourceJsonPins": [
        {
          "path": "data/questions/maritime-special1/two-sittings.json",
          "sha256": "eb5dafe1e0237e97811f52fe9a0c03563db331d9a03c723335804e868614b2c8"
        }
      ],
      "originalCount": 48,
      "normalizedRuntimeSha256": "7e97f1a860095f9e160109f05d0516cf650ac97a4dbedf8374310e3e729b7ba4"
    },
    "riku-tech2": {
      "sourceCommit": "dc70a4312ce0a899e3ee889e78caf9ecc9ecf7bc",
      "sourceJsonPins": [
        {
          "path": "data/questions/riku-tech2/two-sittings.json",
          "sha256": "4fef4f2e4f57ae335f35fb92fb011cb96b372ddbda1fb5935c43527e5e580b4a"
        }
      ],
      "originalCount": 190,
      "normalizedRuntimeSha256": "f4e7003667b8d4f44d37028422ac47729546a60175dfbcc8bdb75575f81bf58f"
    },
    "amateur2": {
      "sourceCommit": "1a5b7c4bd9b57d79ee6c248813bd6a79b65927e9",
      "sourceJsonPins": [
        {
          "path": "data/questions/amateur2/two-sittings.json",
          "sha256": "7f6779e175adf42841b3b155084c3d110c95db062f4e7c4398e30c37e0d96997"
        }
      ],
      "originalCount": 110,
      "normalizedRuntimeSha256": "7d1b91735ce6441b16dbb34cb00eaaaf1379ce42b5cad68e9110615386f16aaa"
    },
    "maritime-radar": {
      "sourceCommit": "8bda096d7855185ee66bb9df9b53c772cedc758c",
      "sourceJsonPins": [
        {
          "path": "data/questions/maritime-radar/2026-february-houki.json",
          "sha256": "75463e2e5dc0f5e716e444e317962390339ba399ffb7cca04fdfbc3304d2525f"
        },
        {
          "path": "data/questions/maritime-radar/2026-february-kogaku.json",
          "sha256": "abe5c44f5633f376fec37479ae3f93d3327fdda5a54f2dcff4a4ed6e2409fe6d"
        },
        {
          "path": "data/questions/maritime-radar/2026-june-houki.json",
          "sha256": "c0d19e7727747da826e829a7575e35a5ea1c78aecce6fdbe631d815d340a5728"
        },
        {
          "path": "data/questions/maritime-radar/2026-june-kogaku.json",
          "sha256": "3a25c4f54e54c12cd61bcc9db933607d1b268108c652d9efe73dcd6caf6abb2d"
        }
      ],
      "originalCount": 48,
      "normalizedRuntimeSha256": "22d353518a5c791707210c2e30a15bd91a6eddffa6ffebab3dbcd6c18c8701f1"
    }
  }
} as const;
