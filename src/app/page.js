'use client'
import Image from "next/image";
import Form from "./components/Form";
import SecondSec from "./components/SecondForm";
import Link from "next/link";
import { useUserContext } from "../../context/userContext";
export default function Home() {
  const {username} = useUserContext();
  return (
    <> 
    <div className="container">
    <div className="pillar left">
        <img src="./assets/images/pillar.png" alt="" />
    </div>
    <div className="pillar right">
        <img src="./assets/images/pillar.png" alt="" />
    </div>
    <div className="pillar left pillar-2">
        <img src="./assets/images/pillar.png" alt="" />
    </div>
    <div className="pillar right pillar-2">
        <img src="./assets/images/pillar.png" alt="" />
    </div>

    <div className="main">
        <div className="logo">
            <img src="./assets/images/SOLSCAPE.png" alt="" />
        </div>
        <div className="nav">
            <ul className="nav-list">
                <li className="nav-item">
                    <a href="">Home</a>
                </li>
                <li className="nav-item active">
                  <Link href="">Deposit</Link>  
                </li>
                <li className="nav-item disabled">
                    <a href="">Stake</a>
                </li>
                <li className="nav-item disabled">
                    <a href="">Withdraw</a>
                </li>
            </ul>
        </div>
        <div className="header">
            <h1>Deposit</h1>
            <div className="symbol">
                <img src="./assets/images/260px-Quests 1.png" alt="" />
            </div>
        </div>
        <div className="main-cont">
          {
          (!username ? 
          (  
            <Form />
          ):(
            <SecondSec />
          ))}
      
        </div>
        <footer className="footer">
            <ul>
                <li>
                    <img src="./assets/images/Tg Icon.png" alt="" />
                    <a href="">Telegram</a>
                </li>
                <li>
                    <img src="./assets/images/X.png" alt="" />
                    <a href="">X</a>
                </li>
                <li>
                    <img src="./assets/images/Discord.png" alt="" />
                    <a href="">Discord</a>
                </li>
                <li>
                    <img src="./assets/images/Wiki.png" alt="" style={{width: '20px', height: '28px', objectFit: 'cover'}} />
                    <a href="">Wiki</a>
                </li>
            </ul>
        </footer>
    </div>
  </div>
  </>
    
  );
}
