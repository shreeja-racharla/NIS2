import { NextResponse } from "next/server";

export async function middleware(req) {
  console.log("process.env.DEBUG", process.env.DEBUG);
  console.log("Debug", /^true$/i.test(process.env.DEBUG));
  // console.log(req.nextUrl)

  const { pathname } = req.nextUrl;

  if (!/^true$/i.test(process.env.DEBUG)) {
    console.log("Middleware Called", req.url);
    // req.cookies.get('access')?.value

    const nonadminPageUrl = new URL(process.env.NONADMINPAGEURL, req.url);
    const adminPageUrl = new URL(process.env.ADMINPAGEURL, req.url);

    const loginPageUrl = new URL(process.env.LOGINPAGEURL, req.url);
    // loginPageUrl.searchParams.set('from', req.nextUrl.pathname)

    if (req.headers.get("cookie")) {
      const axiosConfig = {
        host: req.headers.get("host"),
        "x-real-ip": req.headers.get("x-real-ip"),
        "x-forwarded-for": req.headers.get("x-forwarded-for"),
        "x-forwarded-proto": req.headers.get("x-forwarded-proto"),
        connection: req.headers.get("connection"),
        pragma: req.headers.get("pragma"),
        "cache-control": req.headers.get("cache-control"),
        accept: req.headers.get("accept"),
        "user-agent": req.headers.get("user-agent"),
        referer: req.headers.get("referer"),
        "accept-encoding": req.headers.get("accept-encoding"),
        "accept-language": req.headers.get("accept-language"),
        cookie: req.headers.get("cookie"),
      };
      try {
        // console.log('axiosConfig',axiosConfig,'axiosConfig');
        const response = await fetch(process.env.LOGIN_CHECK_URL, {
          method: "GET",
          headers: axiosConfig,
        });
        // console.log("response ",response)
        if (
          response.status !== 404 &&
          response.status !== 500 &&
          response.status !== 502
        ) {
          const responseText = await response.json();
          if (responseText.message === "You're authenticated!") {
            const setCookieHeader = response.headers.get("set-cookie");
            const cookieAttributes = {};
            cookieAttributes.HttpOnly = false;
            cookieAttributes.sameSite = "Lax";
            cookieAttributes.expires = new Date(Date.now() + 6 * 3600 * 1000);
            console.log(
              cookieAttributes.expires,
              cookieAttributes.expires.toUTCString()
            );
            cookieAttributes.path = "/";
            if (
              responseText["user_type"] !== "super_user" &&
              pathname.startsWith("/admin")
            ) {
              const return_response = NextResponse.redirect(nonadminPageUrl);
              return_response.cookies.set({
                name: "user_data",
                value: JSON.stringify(responseText.user_data),
                httpOnly: cookieAttributes.HttpOnly,
                path: cookieAttributes.path,
                sameSite: cookieAttributes.sameSite,
                expires: cookieAttributes.expires,
              });
              if (setCookieHeader) {
                return_response.headers.set("Set-Cookie", setCookieHeader);
              }
              return return_response;
            }
            const return_response = NextResponse.next();
            return_response.cookies.set({
              name: "user_data",
              value: JSON.stringify(responseText.user_data),
              httpOnly: cookieAttributes.HttpOnly,
              path: cookieAttributes.path,
              sameSite: cookieAttributes.sameSite,
              expires: cookieAttributes.expires,
            });
            if (setCookieHeader) {
              return_response.headers.set("Set-Cookie", setCookieHeader);
            }
            return return_response;
          } else if (
            responseText.detail ===
            "Authentication credentials were not provided."
          ) {
            return NextResponse.redirect(loginPageUrl);
          } else if (
            responseText.detail === "Given token not valid for any token type"
          ) {
            const refresh_access_response = await fetch(
              process.env.REFRESH_ACCESS_URL,
              { method: "GET", headers: axiosConfig }
            );
            // console.log("refresh_access_response ",refresh_access_response)

            const refresh_access_responseText =
              await refresh_access_response.text();

            const setCookieHeader =
              refresh_access_response.headers.get("set-cookie");
            if (
              refresh_access_responseText ===
              "Access Token Refreshed Successfully."
            ) {
              // Set the cookie in the response
              const response = NextResponse.next();
              // Check if set-cookie header is present in the response
              if (setCookieHeader) {
                response.headers.set("Set-Cookie", setCookieHeader);
              }

              return response;
            } else {
              return NextResponse.redirect(loginPageUrl);
            }
          }
        } else {
          const customResponse = new Response("Internal Server Error", {
            status: 500,
            headers: { "Content-Type": "text/plain" },
          });

          // Return the custom response.
          return customResponse;
        }
      } catch (error) {
        const customResponse = new Response("Internal Server Error", {
          status: 500,
          headers: { "Content-Type": "text/plain" },
        });

        // Return the custom response.
        return customResponse;
      }
    } else if (!req.headers.get("cookie")) {
      return NextResponse.redirect(loginPageUrl);
    }
  }
}

export const config = {
  matcher: [
    "/((?!apiv1|apiv2|apiv2test|apiv2jay|vendor-trust/VendorLogin|login|images|fonts|_next/static|_vercel|favicon.ico).*)",
  ],
};
