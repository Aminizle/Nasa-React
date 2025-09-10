// src/components/SocialLinks.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faYoutube,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

function SocialLinks() {
  return (
    <ul className="flex space-x-4 absolute top-4 right-4 z-20">
      <li>
        <a
          href="https://twitter.com/DevAmeenM"
          target="_blank"
          rel="noopener noreferrer"
          title="Follow me on Twitter"
          className="text-blue-400 hover:text-blue-500 transition drop-shadow-[0_0_6px_#1DA1F2]"
        >
          <FontAwesomeIcon icon={faTwitter} size="lg" />
        </a>
      </li>
      <li>
        <a
          href="https://www.youtube.com/channel/UCtnzaJeLTPhhH6jolpdGhpw"
          target="_blank"
          rel="noopener noreferrer"
          title="Watch me in action on YouTube"
          className="text-red-500 hover:text-red-600 transition drop-shadow-[0_0_6px_#FF0000]"
        >
          <FontAwesomeIcon icon={faYoutube} size="lg" />
        </a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/in/ameen-mohiyuddin/"
          target="_blank"
          rel="noopener noreferrer"
          title="Learn more about me on LinkedIn"
          className="text-blue-600 hover:text-blue-700 transition drop-shadow-[0_0_6px_#0A66C2]"
        >
          <FontAwesomeIcon icon={faLinkedin} size="lg" />
        </a>
      </li>
      <li>
        <a
          href="https://ameen-mohiyuddin-portfolio.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          title="Check out my portfolio"
          className="text-purple-400 hover:text-purple-500 transition drop-shadow-[0_0_6px_#a78bfa]"
        >
          <FontAwesomeIcon icon={faCircleUser} size="lg" />
        </a>
      </li>
      <li>
        <a
          href="https://github.com/Aminizle/Nasa-React"
          target="_blank"
          rel="noopener noreferrer"
          title="View this on GitHub"
          className="text-gray-200 hover:text-white transition drop-shadow-[0_0_6px_#ffffff]"
        >
          <FontAwesomeIcon icon={faGithub} size="lg" />
        </a>
      </li>
    </ul>
  );
}

export default SocialLinks;
