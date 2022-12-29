import { parser } from "./parser.ts";
import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { sendMail } from "https://deno.land/x/sendgrid@0.0.3/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const name = "Lucas Oliveira";
const email = "lucas.oliveira@simbioseventures.com";

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const formData = await req.json();
  const parsedData = parser(formData);
  const sendgridApiKey = Deno.env.get("SENDGRID_API_KEY");
  // { name, email, youAre, applicationType, start, budget, more }

  const mail = {
    personalizations: [
      {
        subject: `[indays.app] - Nova mensagem de ${formData.name}`,
        to: [{ name, email }],
      },
    ],
    from: { email: "lucas.oliveira@simbioseventures.com" },
    content: [{ type: "text/html", value: parsedData }],
  };

  await sendMail(mail, { apiKey: sendgridApiKey! });

  return new Response(
    null,
    {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    },
  );
});
