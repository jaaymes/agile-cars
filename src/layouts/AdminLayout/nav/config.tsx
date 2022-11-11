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
        children: [
          { title: 'Lista', path: '/admin/colaboradores' },
          { title: 'Cadastro', path: '/admin/colaboradores/cadastro' },
        ],
      },

      // franqueadores
      {
        title: 'Franqueadores',
        path: '/admin/franqueadores',
        icon: <AiOutlineApartment width={30} height={30} />,
        children: [
          { title: 'Lista', path: '/admin/franqueadores' },
          { title: 'Cadastro', path: '/admin/franqueadores/cadastro' },
        ],
      },

      // Veiculos
      {
        title: 'veículos',
        path: '/admin/veiculos',
        icon: <AiFillCar width={30} height={30} />,
        children: [
          { title: 'Lista', path: '/admin/veiculos' },
          { title: 'Cadastro', path: '/admin/veiculos/cadastro' },
        ],
      },

      // MARCAS
      {
        title: 'marcas',
        path: '/admin/marcas',
        icon: <FaCarSide width={30} height={30} />,
        children: [
          { title: 'Lista', path: '/admin/marcas' },
          { title: 'Cadastro', path: '/admin/marcas/cadastro' },
        ],
      },

      // MODELOS
      {
        title: 'modelos',
        path: '/admin/modelos',
        icon: <IoCarSharp width={30} height={30} />,
        children: [
          { title: 'Lista', path: '/admin/modelos' },
          { title: 'Cadastro', path: '/admin/modelos/cadastro' },
        ],
      },

      // MODELOS VERSÃO
      {
        title: 'modelo versão',
        path: '/admin/modelo-versao',
        icon: <IoCarSharp width={30} height={30} />,
        children: [
          { title: 'Lista', path: '/admin/modelo-versao' },
          { title: 'Cadastro', path: '/admin/modelo-versao/cadastro' },
        ],
      },
    ],
  },

];

export default navConfig;
