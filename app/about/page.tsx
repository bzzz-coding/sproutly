const About = () => {
  return (
    <>
      <h1 className="text-5xl font-bold mb-8 text-center">
        Sproutly
        <br />
      </h1>

      <div className="prose max-w-lg mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Where Seedlings and Dreams Take Root (For Fellow Plant Nerds!)
        </h2>

        <p className="mb-3">
          Hey there, fellow dirt-diggers! I'm just a gardening geek with a
          passion for nurturing seedlings and a knack for coding. That's how
          Sproutly sprouted—a pet project to help you (and me!) outsmart those
          frosty foes and harvest homegrown happiness.
        </p>

        <p className="mb-3">Think of it as your friendly garden guide:</p>
        <p className="mb-3">
          <strong>Frost Lookup:</strong> No more guessing games! Sproutly taps
          into the{" "}
          <a
            className="link link-primary"
            href="https://www.farmsense.net/api/frost-date-api/"
          >
            FarmSense API
          </a>{" "}
          to help you check out your local last frost in spring and first frost
          in fall. Get the down-low on those nippy nights to keep your precious
          plants safe.
        </p>
        <p className="mb-3">
          <strong>Date Calculator:</strong> With those frost dates in hand,
          Sproutly helps you figure out the perfect sowing times for your seeds
          and transplants. No more missed windows or late-blooming blooms!
        </p>
        <p className="mb-3">
          <strong>Open-Source Playground:</strong> This isn't a money-making
          scheme, just a passion project! Head over to{" "}
          <a
            href="https://github.com/bzzz-coding"
            className="link link-primary"
          >
            my GitHub
          </a>{" "}
          if you want to tinker, share tips, or collaborate.
        </p>
      </div>
    </>
  );
};
export default About;
