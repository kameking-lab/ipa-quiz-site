export function buildOpenApiSpec(baseUrl: string) {
  const practiceResponses = {
    "401": { description: "演習にログインが必要です（sign_in_required）。" },
    "403": { description: "リクエストの送信元を確認できません（invalid_origin）。" },
    "428": {
      description: "ゲストCookieを発行しました（guest_cookie_required）。受け取ったCookieを付けて同じリクエストを再送してください。",
      headers: { "Set-Cookie": { schema: { type: "string" } } },
    },
    "429": {
      description: "演習の無料枠（daily_limit）またはリクエストのレート制限に達しました。",
      content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
    },
  };
  return {
    openapi: "3.1.0",
    info: {
      title: "過去問AI Public API",
      version: "1.0.0-beta",
      description:
        "IPA 情報処理技術者試験 13 区分の問題データ・採点機能を提供する公開 API。" +
        "β 版のため、エンドポイントの URL・レスポンス形は予告なく変更される可能性があります。",
      contact: {
        name: "過去問AI",
        url: baseUrl,
      },
      license: {
        name: "問題本文の著作権は各試験実施団体に帰属します。レスポンス構造は MIT。",
      },
    },
    servers: [
      { url: `${baseUrl}/api/v1`, description: "Production" },
    ],
    tags: [
      { name: "exams", description: "試験区分の一覧と統計" },
      { name: "questions", description: "問題データの取得" },
      { name: "grade", description: "解答の採点" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          description:
            "API キーは `Authorization: Bearer <key>` で送信してください。" +
            "キー未指定時は IP ベースでリクエストを計数します。問題取得・採点の演習枠はセッションまたはゲストCookieで計数します。",
        },
      },
      schemas: {
        Exam: {
          type: "object",
          required: ["code", "label", "questionCount"],
          properties: {
            code: {
              type: "string",
              description: "試験区分コード（小文字 2-3 文字）",
              example: "ap",
            },
            label: {
              type: "string",
              description: "試験区分の日本語ラベル",
              example: "応用情報技術者",
            },
            questionCount: {
              type: "integer",
              description: "現在収録されている問題数",
              example: 1280,
            },
          },
        },
        NumericAnswer: {
          type: "object",
          required: ["format", "unit"],
          oneOf: [
            { properties: { format: { enum: ["integer"] } } },
            { properties: { format: { enum: ["decimal"] } }, required: ["precision"] },
          ],
          properties: {
            format: { type: "string", enum: ["integer", "decimal"] },
            precision: { type: "integer", enum: [1, 2], description: "小数記入の場合は必須。原問指定の小数第1位または第2位まで。整数記入では省略。" },
            unit: { type: "string", minLength: 1, example: "滴/分" },
          },
        },
        Question: {
          type: "object",
          required: ["id", "exam", "year", "season", "qNumber", "type", "category", "question"],
          properties: {
            id: { type: "string", example: "ap-2024a-am-q1" },
            exam: { type: "string", example: "ap" },
            session: { type: "string", example: "am" },
            year: { type: "integer", example: 2024 },
            season: { type: "string", enum: ["spring", "autumn", "cbt", "published", "first", "second", "early", "may", "september", "january", "october", "late", "annual", "july", "primary", "kansai"], example: "autumn" },
            qNumber: { type: "integer", example: 1 },
            type: {
              type: "string",
              enum: ["multiple-choice", "numeric", "descriptive", "essay"],
              example: "multiple-choice",
            },
            numericAnswer: { $ref: "#/components/schemas/NumericAnswer" },
            category: { type: "string", example: "テクノロジ系" },
            topicTags: { type: "array", items: { type: "string" } },
            difficulty: { type: "integer", minimum: 1, maximum: 5 },
            question: { type: "string" },
            choices: {
              type: "object",
              additionalProperties: { type: "string" },
              example: { ア: "選択肢A", イ: "選択肢B", ウ: "選択肢C", エ: "選択肢D" },
            },
            answer: { description: "正解。文字列または配列", oneOf: [{ type: "string" }, { type: "array", items: { type: "string" } }] },
            explanation: { type: "string" },
            sourcePdfUrl: { type: "string", format: "uri" },
            sourceArchiveUrl: { type: "string", format: "uri", description: "当該回の公式問題PDF（保存版）" },
            sourceAnswerUrl: { type: "string", format: "uri" },
            sourceAnswerArchiveUrl: { type: "string", format: "uri", description: "当該回の公式正答PDF（保存版）" },
            license: { type: "string", example: "IPA-public" },
          },
        },
        GradeRequest: {
          type: "object",
          required: ["questionId", "answer"],
          properties: {
            questionId: { type: "string", example: "ap-2024a-am-q1" },
            answer: {
              description: "受験者の解答（多肢選択は ア/イ/ウ/エ、複数解答は配列）",
              oneOf: [{ type: "string" }, { type: "array", items: { type: "string" } }],
            },
          },
        },
        GradeResponse: {
          type: "object",
          required: ["correct", "correctAnswer", "explanation"],
          properties: {
            correct: { type: "boolean" },
            correctAnswer: { oneOf: [{ type: "string" }, { type: "array", items: { type: "string" } }] },
            explanation: { type: "string" },
            sourcePdfUrl: { type: "string", format: "uri" },
            sourceArchiveUrl: { type: "string", format: "uri", description: "当該回の公式問題PDF（保存版）" },
            sourceAnswerUrl: { type: "string", format: "uri" },
            sourceAnswerArchiveUrl: { type: "string", format: "uri", description: "当該回の公式正答PDF（保存版）" },
          },
        },
        Error: {
          type: "object",
          required: ["error"],
          properties: {
            error: { type: "string", example: "rate_limited" },
            questionType: { type: "string", description: "採点対象外の問題形式" },
            supportedQuestionTypes: { type: "array", items: { type: "string", enum: ["multiple-choice"] } },
            numericAnswer: { $ref: "#/components/schemas/NumericAnswer" },
            message: { type: "string" },
            resetAt: { type: "integer", description: "リセット時刻（UNIX ms）" },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }, {}],
    paths: {
      "/exams": {
        get: {
          tags: ["exams"],
          summary: "試験区分の一覧",
          description: "登録済みの全試験区分と、それぞれの問題収録数を返します。",
          responses: {
            "200": {
              description: "試験区分一覧",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["exams"],
                    properties: {
                      exams: { type: "array", items: { $ref: "#/components/schemas/Exam" } },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/questions": {
        get: {
          tags: ["questions"],
          summary: "問題データの取得",
          description: "演習の無料枠と当日取得した問題IDを共有します。取得できる問題が limit 未満の場合、許可された先頭の問題までを返します。",
          parameters: [
            {
              name: "exam",
              in: "query",
              required: true,
              schema: {
                type: "string",
                enum: ["ip", "sg", "fe", "ap", "st", "sa", "pm", "nw", "db", "es", "sc", "sm", "au"],
              },
            },
            { name: "year", in: "query", schema: { type: "integer" } },
            { name: "season", in: "query", schema: { type: "string", enum: ["spring", "autumn", "cbt", "published", "first", "second", "early", "may", "september", "january", "october", "late", "annual", "july", "primary", "kansai"] } },
            { name: "session", in: "query", schema: { type: "string" } },
            { name: "category", in: "query", schema: { type: "string" } },
            {
              name: "limit",
              in: "query",
              description: "1 リクエストで返す最大件数（1-100）",
              schema: { type: "integer", minimum: 1, maximum: 100, default: 20 },
            },
            {
              name: "offset",
              in: "query",
              description: "ページング用オフセット",
              schema: { type: "integer", minimum: 0, default: 0 },
            },
          ],
          responses: {
            ...practiceResponses,
            "200": {
              description: "問題リスト",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["questions", "total"],
                    properties: {
                      questions: { type: "array", items: { $ref: "#/components/schemas/Question" } },
                      total: { type: "integer" },
                      limit: { type: "integer" },
                      offset: { type: "integer" },
                    },
                  },
                },
              },
            },
            "400": {
              description: "リクエストエラー",
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/Error" } },
              },
            },
          },
        },
      },
      "/grade": {
        post: {
          tags: ["grade"],
          summary: "解答の採点",
          description:
            "演習の無料枠と当日取得した問題IDを共有します。多肢選択（multiple-choice）のみ採点対応。数値記入（numeric）・記述・論述問題は400と error: unsupported を返します。問題形式と対応形式を返し、numeric では整数・単位の形式情報を含みます。",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/GradeRequest" },
              },
            },
          },
          responses: {
            ...practiceResponses,
            "200": {
              description: "採点結果",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/GradeResponse" },
                },
              },
            },
            "400": {
              description: "リクエストエラー",
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/Error" } },
              },
            },
            "404": {
              description: "問題が見つからない",
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/Error" } },
              },
            },
          },
        },
      },
    },
  };
}
