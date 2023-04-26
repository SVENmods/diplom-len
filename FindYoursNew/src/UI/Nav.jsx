import '../assets/css/components/nav.scss'

const Nav = ({role}) => {
     return (
          <nav className=''>
               {/* <img src="" alt="" /> */}
               <a href="/">Услуги</a>
               <a href="/">Вакансии</a>
               {/* <a href="">Мои запросы</a> */}
               {
                    role === "employee" && (
                         <a href="/selection">Подбор сотрудника</a>
                    )
               }
               
          </nav>
     );
}

export default Nav;