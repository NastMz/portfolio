import './App.css';
import {BsFillMoonStarsFill} from 'react-icons/bs';
import {AiFillFacebook, AiFillLinkedin, AiFillTwitterCircle, FaCode, FaPaintBrush, FaThumbsUp} from "react-icons/all";
import avatar from '../public/images/avatar.png';
import web1 from '../public/images/web1.png';
import web2 from '../public/images/web2.png';
import web3 from '../public/images/web3.png';
import web4 from '../public/images/web4.png';
import {useEffect, useState} from "react";
import Logo from "./components/Logo";

function App() {

    const [darkMode, setDarkMode] = useState<boolean>(localStorage.getItem('d-mode') === "true");

    useEffect(()=>localStorage.setItem('d-mode', darkMode.toString()), [darkMode]);

    return (
        <div className={`${darkMode ? 'dark' : ''}`}>
            <main className={'bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-900'}>
                <section className={'min-h-screen'}>
                    <nav className={'py-5 md:pb-1 mb-2 flex justify-between dark:text-white'}>
                        <Logo isDark={darkMode}/>
                        <ul className={'flex items-center'}>
                            <li>
                                <BsFillMoonStarsFill className={'cursor-pointer'} onClick={()=>setDarkMode(!darkMode)}/>
                            </li>
                            <li>
                                <a href="#services"
                                   className={'bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 border-none rounded-md ml-8'}>
                                    Resumen
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className={'text-center p-10 py-10 md:py-1'}>
                        <h2 className={'text-5xl py-2 text-teal-600 font-medium md:text-6xl dark:text-white'}>
                            Kevin Martinez
                        </h2>
                        <h3 className={'text-2xl py-2 md:text-3xl dark:text-white'}>
                            Ingeniero de Sistemas
                        </h3>
                        <p className={'text-md py-5 leading-8 text-gray-800 md:text-xl max-w-lg mx-auto  dark:text-gray-200'}>
                            Estudiante con conocimiento en desarrollo
                            de software (Frontend y Backend) en multiples lenguajes de
                            programación y frameworks, bases de datos y diseño gráfico con la
                            motivación de aprender siempre algo nuevo.
                        </p>
                    </div>
                    <div className={'text-5xl flex justify-center gap-16 py-3 mb-8 text-gray-600 dark:text-gray-400'}>
                        <AiFillFacebook/>
                        <AiFillTwitterCircle/>
                        <AiFillLinkedin/>
                    </div>
                    <div
                        className={'mx-auto bg-gradient-to-b from-teal-500 rounded-full w-80 h-80 relative overflow-hidden md:h-96 md:w-96 md:mb-10'}>
                        <img src={avatar} alt="" className={'object-cover'}/>
                    </div>
                </section>

                <section id={'services'}>
                    <div>
                        <h3 className={'text-3xl py-1 dark:text-white'}>
                            Servicios que ofrezco
                        </h3>
                        <p className={'text-md py-2 leading-8 text-gray-800 dark:text-gray-200'}>
                            Como Ingeniero de Sistemas cuento con las habilidades para desarrollar <span
                            className={'text-teal-500'}>soluciones</span> totalmente <span
                            className={'text-teal-500'}>personalizadas</span> para cualquier tipo de necesidad.
                        </p>
                        <p className={'text-md py-2 leading-8 text-gray-800 dark:text-gray-200'}>
                            Ofresco una amplia gama de servicios de desarrollo, entre los cuales estan el desarrolo web
                            (Frontend y Backend), el desarrollo móvil y aplicaciones de escritorio.
                        </p>
                    </div>
                    <div className={'lg:flex gap-10'}>
                        <div className={'text-center shadow-lg p-10 rounded-xl my-10 flex flex-col items-center dark:bg-white flex-1'}>
                            <FaPaintBrush className={'text-7xl text-cyan-500'}/>
                            <h3 className={'text-lg font-medium pt-8 pb-2'}>Hermosos Diseños</h3>
                            <p className={'py-2'}>
                                Creando diseños elegantes adaptados a sus necesidades.
                            </p>
                            <h4 className={'py-4 text-teal-600'}>Herramientas de diseño que uso</h4>
                            <p className={'py-1 text-gray-800'}>Gimp</p>
                            <p className={'py-1 text-gray-800'}>Inkscape</p>
                        </div>

                        <div className={'text-center shadow-lg p-10 rounded-xl my-10 flex flex-col items-center dark:bg-white flex-1'}>
                            <FaCode className={'text-7xl text-cyan-500'}/>
                            <h3 className={'text-lg font-medium pt-8 pb-2'}>Codifica el proyecto de tus sueños</h3>
                            <p className={'py-2'}>
                                ¿Tienes una idea para tu próxima gran aplicación? Hagamos que sea un
                                realidad.
                            </p>
                            <h4 className={'py-4 text-teal-600'}>Herramientas de desarrollo que uso</h4>
                            <div className={'grid grid-cols-3 md:grid-cols-2'}>
                                <p className={'py-1 text-gray-800'}>React</p>
                                <p className={'py-1 text-gray-800'}>Django</p>
                                <p className={'py-1 text-gray-800'}>Spring</p>
                                <p className={'py-1 text-gray-800'}>Flask</p>
                                <p className={'py-1 text-gray-800'}>Flutter</p>
                                <p className={'py-1 text-gray-800'}>Laravel</p>
                                <p className={'py-1 text-gray-800'}>Tailwind CSS</p>
                                <p className={'py-1 text-gray-800'}>PyQT</p>
                                <p className={'py-1 text-gray-800'}>JavaFX</p>
                            </div>
                        </div>

                        <div className={'text-center shadow-lg p-10 rounded-xl my-10 flex flex-col items-center dark:bg-white flex-1'}>
                            <FaThumbsUp className={'text-7xl text-cyan-500'}/>
                            <h3 className={'text-lg font-medium pt-8 pb-2'}>Consultoria</h3>
                            <p className={'py-2'}>
                                ¿Está interesado en recibir comentarios para su proyecto actual? Puedo
                                darle consejos y trucos para subir de nivel.
                            </p>
                        </div>
                    </div>
                </section>
                <section>
                    <div>
                        <h3 className={'text-3xl py-1 dark:text-white'}>
                            Portafolio
                        </h3>
                        <p className={'text-md py-2 leading-8 text-gray-800 dark:text-gray-200'}>
                            A continuación puedes ver algunos <span
                            className={'text-teal-500'}>ejemplos</span>  de lo que podria llegar a ser tu próxima <span className={'text-teal-500'}>aplicación</span>.
                        </p>
                    </div>
                    <div className={'flex flex-col gap-10 py-10 lg:flex-row lg:flex-wrap'}>
                        <div className={'basis-1/3 flex-1'}>
                            <img src={web1} alt="" className={'rounded-lg object-cover w-full h-full'}/>
                        </div>
                        <div className={'basis-1/3 flex-1'}>
                            <img src={web2} alt="" className={'rounded-lg object-cover w-full h-full'}/>
                        </div>
                        <div className={'basis-1/3 flex-1'}>
                            <img src={web3} alt="" className={'rounded-lg object-cover w-full h-full'}/>
                        </div>
                        <div className={'basis-1/3 flex-1'}>
                            <img src={web4} alt="" className={'rounded-lg object-cover w-full h-full'}/>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default App
