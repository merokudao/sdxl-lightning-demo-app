import { Message } from "ai/react";
import { FC, useDeferredValue, useEffect, useState } from "react";
import { motion, useAnimate, stagger } from "framer-motion";

interface MessageProps {
  message: Message;
}

const Message: FC<MessageProps> = (props: MessageProps) => {
  const { role, content } = props.message;

  if (role === "user") {
    return (
      <div
        className={`flex w-fit px-4 py-2 rounded-lg ${
          role === "user" ? "max-w-xl ml-auto bg-slate-800" : "mr-auto"
        }`}
      >
        <p className="leading-9">{content}</p>
      </div>
    );
  }

  return <AnimateMsg content={content} />;
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
      {
        duration: 2,
        delay: stagger(0.2),
      }
    );
  }, [content, animate]);

  return (
    <div className="flex w-full px-4 py-2">
      <motion.p ref={scope} className="leading-9">
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
      {
        duration: 2,
        delay: stagger(0.2),
      }
    );
  }, [animate]);

  return (
    <div className="flex w-full px-4 py-2">
      <motion.p ref={scope} className="leading-9">
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
