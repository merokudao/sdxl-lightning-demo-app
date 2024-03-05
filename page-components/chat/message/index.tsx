import { Message } from "ai/react";
import { FC, useEffect, useState } from "react";
import { motion, useAnimate, stagger } from "framer-motion";

interface MessageProps {
  message: Message;
}

const animationConfig = {
  duration: 0.8,
  delay: stagger(0.1),
};

const Message: FC<MessageProps> = (props: MessageProps) => {
  const { role, content } = props.message;

  if (role === "user") {
    return <AnimateUserMessage content={content} />;
  }

  return <AnimateMsg content={content} />;
};

const AnimateUserMessage: FC<{ content: string }> = (props) => {
  const { content } = props;
  const [scope, animate] = useAnimate();
  const [movedToTop, setMovedToTop] = useState(false);

  useEffect(() => {
    if (animate && movedToTop && content && scope.current) {
      animate(
        scope.current,
        {
          opacity: 1,
        },
        animationConfig
      );
    }
  }, [animate, movedToTop, content, scope]);

  useEffect(() => {
    // Function to scroll the new component into view at the top of the flex container
    const scrollToTop = () => {
      scope.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "end",
      });
      setMovedToTop(true);
    };

    scrollToTop();
  }, [scope]);

  return (
    <motion.div
      className={`flex w-fit px-4 py-2 rounded-lg max-w-md ml-auto bg-blue-600 text-white`}
      ref={scope}
      style={{ opacity: 0 }}
    >
      <motion.p className="leading-7 text-white">{content}</motion.p>
    </motion.div>
  );
};

const AnimateMsg: FC<{ content: string }> = (props) => {
  const { content } = props;

  const [scope, animate] = useAnimate();

  const wordsArray = content.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      animationConfig
    );
  }, [content, animate]);

  return (
    <div className="flex w-full px-4 py-2">
      <motion.p ref={scope} className="leading-7">
        {wordsArray.map((word, idx) => {
          return (
            <motion.span key={word + idx} style={{ opacity: 0 }}>
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.p>
    </div>
  );
};

const AnimatedMessage: FC<{ content: string }> = (props) => {
  const { content } = props;

  const [scope, animate] = useAnimate();
  const wordsArray = content.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      animationConfig
    );
  }, [animate]);

  return (
    <div className="flex w-full px-4 py-2">
      <motion.p ref={scope} className="leading-7">
        {wordsArray.map((word, idx) => {
          return (
            <>
              <motion.span key={word + idx} style={{ opacity: 0 }}>
                {word}{" "}
              </motion.span>
              {word === "\n" ? (
                <>
                  <br />
                  <div className="w-full h-2" />
                </>
              ) : null}
            </>
          );
        })}
      </motion.p>
    </div>
  );
};

export { Message, AnimatedMessage };
