import React from "react";

const NotePage = () => {
  return (
    <div className="relative">
      <section className="h-[60vh] w-full block sm:fixed top-0 left-0 bg-[url('https://framerusercontent.com/images/GBima0noCOuo10gwHXoE16OHnWc.jpg')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center [filter:sepia(0.1)]">
        <h1 className="text-3xl sm:text-5xl manrope font-[800] text-white text-center z-10 relative w-[50%]">
          Buildspace raises $10M led by a16z to build Hogwarts for builders and
          dreamers.
        </h1>
        <div className="flex items-center gap-2 text-white/60">
          <img
            src="https://i.imgur.com/HzmYwZH.png"
            alt="user"
            width={40}
            height={40}
            className="rounded-full mt-2"
          />
          <b>Shrit</b> • 7 min read
        </div>
      </section>
      <section className="relative z-10 mt-0 sm:mt-[60vh] backdrop-blur-3xl bg-black/40 px-12 py-40 text-lg flex justify-center min-h-screen">
        <div className="max-w-[40rem] w-full flex flex-col gap-10 py-5">
          <h2 className="manrope text-2xl font-[800] text-white line-height-10">
            ChatGPT has taken the tech world by storm and for good reason! It's
            impressive and the conversations feel natural. Let's connect it to
            the most popular messaging app in the world.
          </h2>
          <p className="text-white/80 py-3">
            If you haven't heard of ChatGPT, you must be off the grid. Respect.
            Most feeds and timelines are flooded with pics of conversations from
            this AI that seemingly is the most intelligent "thing" in the world.
            People have been using it for everything from answering questions to
            just having a casual chat. It's definitely unique and innovative,
            and I believe it has the potential to change how we fundamentally
            think about AI.
          </p>
          <p>
            Since its release, it's been used by millions of people around the
            world and most are shocked by its ability to hold a conversation
            just like a real person. The prospect of being able to chat with an
            AI that can understand and respond to us in a natural way is really
            exciting.
          </p>

          <h2>Step 1: Setting up Twilio account</h2>
          <p>
            If you have ever built WhatsApp bots before, you must have heard of
            Twilio. Twilio is a cloud communications platform that allows you to
            build WhatsApp bots easily. With Twilio, you can create automated
            chatbots that can send and receive messages from your customers on
            WhatsApp.
          </p>

          <img
            src="https://i.imgur.com/rlkfSCX.png"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>
    </div>
  );
};

export default NotePage;
