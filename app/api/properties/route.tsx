import connectDB from "@/config/database";

export async function GET(request: Request) {
  try {
    await connectDB();

    return new Response(JSON.stringify({ message: "Hello World" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
