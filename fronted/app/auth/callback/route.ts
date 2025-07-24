import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const token = searchParams.get("token")
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/"

  if (token) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Authentication</title>
          <script>
            localStorage.setItem("auth_token", "${token}")
            window.location.href = "${next}"
          </script>
        </head>
        <body>
          <p>Authenticating...</p>
        </body>
      </html>
    `

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
      },
    })
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(
    `${origin}/auth/error?message=${encodeURIComponent(
      "Missing authentication token or code"
    )}`
  )
}
