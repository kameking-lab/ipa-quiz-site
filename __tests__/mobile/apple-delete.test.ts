import {afterEach,expect,it,vi} from "vitest";
import {revokeApple,redactBilling} from "@/lib/auth/delete-account";
afterEach(()=>vi.unstubAllEnvs());
it("revokes Apple refresh tokens with a server call and refuses deletion if revocation fails",async()=>{
  vi.stubEnv("AUTH_APPLE_ID","mock.client");vi.stubEnv("AUTH_APPLE_SECRET","mock.secret");
  const transport=vi.fn().mockResolvedValue(new Response(null,{status:200}));
  const linked=[{provider:"apple",refresh_token:"mock.token",access_token:null}];
  await revokeApple(linked,transport);expect(transport).toHaveBeenCalledTimes(1);
  expect(transport.mock.calls[0][0]).toBe("https://appleid.apple.com/auth/revoke");
  transport.mockResolvedValue(new Response(null,{status:503}));await expect(revokeApple(linked,transport)).rejects.toThrow("apple_revocation_unavailable");
  await expect(revokeApple([{...linked[0],refresh_token:null}],transport)).rejects.toThrow("apple_reauthentication_required");
});
it("separates retained transaction facts from identity and practice data",()=>{
  expect(redactBilling({userId:"owner",email:"private",customer:{email:"private",id:"cus_mock"},grants:{today:["q1"]},amount:980},"archive")).toEqual({userId:"archive",customer:{id:"cus_mock"},amount:980});
});
