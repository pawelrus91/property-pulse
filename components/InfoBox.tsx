import Link, { LinkProps } from "next/link";
import { clsx } from "clsx";

type ButtonInfo = {
  link: LinkProps["href"];
  text: React.ReactNode;
  backgroundColor: string;
};

type InfoBoxProps = {
  heading: string;
  backgroundColor?: string;
  textColor?: string;
  buttonInfo: ButtonInfo;
  children: React.ReactNode;
};

export default function InfoBox({
  heading,
  backgroundColor = "bg-gray-100",
  textColor = "text-gray-800",
  buttonInfo,
  children,
}: InfoBoxProps) {
  return (
    <div className={clsx("p-6 rounded-lg shadow-md", backgroundColor)}>
      <h2 className={clsx("text-2xl font-bold", textColor)}>{heading}</h2>
      <p className={clsx("mt-2 mb-4", textColor)}>{children}</p>
      <Link
        href={buttonInfo.link && "/"}
        className={clsx(
          "inline-block text-white rounded-lg px-4 py-2 hover:opacity-80",
          buttonInfo.backgroundColor
        )}
      >
        {buttonInfo.text}
      </Link>
    </div>
  );
}
