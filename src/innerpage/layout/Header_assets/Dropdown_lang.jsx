import { useState } from 'react';
import { Ch, Esp, Gb, In } from '../../../assets/image';
import { Link } from 'react-router-dom';
import i18n from '../../../../src/utils/i18n';

const Dropdown_lang = () => {
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-center items-center gap-1 w-full rounded-full border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
      >
        <img src={Gb} alt="English" width="20px" /> Eng
      </button>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        >
          <div className="py-1">
            <Link onClick={() => changeLanguage('en')} className="text-gray-700 px-4 py-2 text-sm hover:bg-gray-100 flex gap-3 items-center">
              <img src={Gb} alt="English" /> ENG
            </Link>
            <Link onClick={() => changeLanguage('sp')} className="text-gray-700 px-4 py-2 text-sm hover:bg-gray-100 flex gap-3 items-center">
              <img src={Esp} alt="Spanish" /> SPA
            </Link>
            <Link onClick={() => changeLanguage('hi')} className="text-gray-700 px-4 py-2 text-sm hover:bg-gray-100 flex gap-3 items-center">
              <img src={In} alt="Hindi" /> HIN
            </Link>
            <Link onClick={() => changeLanguage('ch')} className="text-gray-700 px-4 py-2 text-sm hover:bg-gray-100 flex gap-3 items-center">
              <img src={Ch} alt="Chinese" /> CN
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown_lang;
