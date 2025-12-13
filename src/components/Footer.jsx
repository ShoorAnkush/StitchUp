import Image from "next/image";
import Link from "next/link";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="px-6 pt-8 md:px-16 lg:px-36 w-full text-gray-300 bg-gray-900">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-10">
        <div className="md:max-w-[24rem]">
          <Image
            src="/images/logo-footer.png"
            alt="Ankush Shoor Logo"
            className="h-11 w-auto"
            width={176}
            height={44}
          />

          <p className="mt-6 text-sm">
            Ankush Shoor — passionate about technology, full-stack development,
            and digital experiences. Currently based in Canada, combining
            technical expertise with creativity to build impactful solutions.
          </p>

          <div className="flex items-center gap-2 mt-4">
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg"
              alt="Get it on Google Play"
              className="h-10 w-auto border border-white rounded"
            />
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg"
              alt="Download on the App Store"
              className="h-10 w-auto border border-white rounded"
            />
          </div>
        </div>

        <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
          <div>
            <h2 className="font-semibold mb-5">Portfolio</h2>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/projects">Projects</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/resume">Resume</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>📍 Toronto, Canada</p>
              <p>📧 ankushshoor96@gmail.com</p>
              <a
                href="https://ankushshoor.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                🔗 ankushshoor.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <p className="pt-4 text-center text-sm pb-5">
        © {CURRENT_YEAR} Ankush Shoor. All rights reserved.
      </p>
    </footer>
  );
}
