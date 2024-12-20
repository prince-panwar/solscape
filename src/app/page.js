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
    <a href="http://solscape.games/"> {/* Link to the home page */}
        <img src="./assets/images/SOLSCAPE.png" alt="Logo" />
    </a>
</div>

        <div className="nav">
            <ul className="nav-list">
                <li className="nav-item">
                    <a href="http://solscape.games/">Home</a>
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
                    <a href="https://t.me/solscapesolana">Telegram</a>
                </li>
                <li>
                    <img src="./assets/images/X.png" alt="" />
                    <a href="https://x.com/i/communities/1867160086180778344">X</a>
                </li>
                <li>
                    <img src="./assets/images/Discord.png" alt="" />
                    <a href="https://discord.com/invite/solscape">Discord</a>
                </li>
                <li>
                    <img src="./assets/images/Wiki.png" alt="" style={{width: '20px', height: '28px', objectFit: 'cover'}} />
                    <a href="https://solscape.fandom.com/wiki/Deposit">Wiki</a>
                </li>
                <li>
                    <img src="./assets/images/Tiktkk.png" alt="" style={{width: '20px', height: '28px', objectFit: 'cover'}} />
                    <a href="https://www.tiktok.com/@solscape">Tiktok</a>
                </li>
                <li>
                    <img src="./assets/images/instagram.webp" alt="" style={{width: '20px', height: '28px', objectFit: 'cover'}} />
                    <a href="https://www.instagram.com/solscape">Instagram</a>
                </li>

            </ul>
        </footer>
    </div>
  </div>
  </>
    
  );
}
