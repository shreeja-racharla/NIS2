import { Fragment } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Highlight, themes } from "prism-react-renderer";

const HighlightCode = ({ code }) => {
  console.log(code,'code')
  const copyAction = (event) => {
    event.target.textContent = "Copied";
    setTimeout(() => {
      event.target.textContent = "Copy";
    }, 3000);
  };

  return (
    <Fragment>
      <CopyToClipboard text={code}>
        <button
          onClick={copyAction}
          className="bg-blue-500 text-white text-sm px-4 py-1 rounded shadow hover:bg-blue-600 focus:outline-none float-right m-2"
        >
          Copy
        </button>
      </CopyToClipboard>
      <Highlight
        theme={themes.shadesOfPurple} // Pass the theme directly
        code={code}
        language="jsx" // Provide the language explicitly
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} overflow-auto rounded-md p-4`}
            style={style}
          >
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })} key={`line-${i}`}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} key={`token-${key}`} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </Fragment>
  );
};

export default HighlightCode;
