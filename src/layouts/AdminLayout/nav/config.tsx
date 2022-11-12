import { AiFillCar, AiOutlineApartment, AiOutlineDashboard } from 'react-icons/ai';
import { FaCarSide, FaUserCog } from 'react-icons/fa';
import { IoCarSharp } from 'react-icons/io5';

const navConfig = [
  {
    items: [
      { title: 'início', path: '/admin/dashboard', icon: <AiOutlineDashboard /> },
    ],
  },

  {
    items: [
      // colaboradores
      {
        title: 'colaboradores',
        path: '/admin/colaboradores',
        icon: <FaUserCog />,
      },

      // franqueadores
      {
        title: 'Franqueadores',
        path: '/admin/franqueadores',
        icon: <AiOutlineApartment width={30} height={30} />,
      },

      // Veiculos
      {
        title: 'veículos',
        path: '/admin/veiculos',
        icon: <AiFillCar width={30} height={30} />,
      },

      // MARCAS
      {
        title: 'marcas',
        path: '/admin/marcas',
        icon: <FaCarSide width={30} height={30} />,
      },

      // MODELOS
      {
        title: 'modelos',
        path: '/admin/modelos',
        icon: <IoCarSharp width={30} height={30} />,
      },

      // MODELOS VERSÃO
      {
        title: 'modelo versão',
        path: '/admin/modelo-versao',
        icon: <IoCarSharp width={30} height={30} />,
      },
    ],
  },

];

export default navConfig;
