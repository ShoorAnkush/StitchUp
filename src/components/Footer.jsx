import Image from "next/image";
import Link from "next/link";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="px-6 pt-10 md:px-16 lg:px-36 w-full text-gray-300 bg-gray-900">
      <div className="flex flex-col md:flex-row justify-between w-full gap-12 border-b border-gray-700 pb-10">
        {/* Brand + CTA */}
        <div className="md:max-w-[24rem]">
          <Image
            src="/images/icon.png"
            alt="Ankush Shoor Logo"
            className="h-11 w-auto"
            width={176}
            height={44}
          />

          <p className="mt-6 text-sm leading-relaxed text-gray-400">
            Ankush Shoor — full-stack developer focused on building clean,
            scalable, and user-centric digital experiences. Based in Canada,
            blending strong engineering fundamentals with thoughtful design.
          </p>

          {/* Portfolio CTA */}
          <div className="flex items-center gap-3 mt-5">
            <a
              href="https://ankushshoor.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-90 transition"
            >
              <img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg"
                alt="View Portfolio"
                className="h-10 border border-white rounded"
              />
            </a>

            <a
              href="https://ankushshoor.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-90 transition"
            >
              <img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg"
                alt="View Portfolio"
                className="h-10 border border-white rounded"
              />
            </a>
          </div>
        </div>

        {/* Right side */}
        <div className="flex-1 flex flex-row items-start md:justify-end gap-12 xs:gap-16 md:gap-32">
          {/* Navigation */}
          <div>
            <h2 className="font-semibold mb-5 text-white">Portfolio</h2>
            <ul className="text-sm space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white">
                  Resume
                </Link>
              </li>
            </ul>
          </div>

          {/* Get in touch */}
          <div>
            <h2 className="font-semibold mb-5 text-white">Get in touch</h2>
            <div className="text-sm space-y-2 text-gray-400">
              <p>📍 Toronto, Canada</p>
              <p>
                📧{" "}
                <a
                  href="mailto:ankushshoor96@gmail.com"
                  className="hover:text-white"
                >
                  ankushshoor96@gmail.com
                </a>
              </p>

              <a
                href="https://github.com/ShoorAnkush"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-white"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/ankush-shoor"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-white"
              >
                LinkedIn
              </a>

              <a
                href="/Ankush%20Shoor%20resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block underline underline-offset-2 hover:text-white"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>

      <p className="pt-5 text-center text-sm text-gray-500 pb-6">
        © {CURRENT_YEAR} Ankush Shoor. All rights reserved.
      </p>
    </footer>
  );
}
