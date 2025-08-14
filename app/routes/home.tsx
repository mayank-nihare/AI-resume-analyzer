import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar"
import {resumes} from "~/constants";
import {callback} from "fdir/dist/api/async";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
    const { auth} = usePuterStore();
    const navigate = useNavigate();

    useEffect( ()=> {
        if(!auth.isAuthenticated) navigate( '/auth?next=/');
    }, [auth.isAuthenticated]);
  return <main className="bg-[url('/public/assets/public/images/bg-main.svg')] bg-cover">
      <Navbar/>
      <section className="main-section">
          <div className="page-heading py-16">
              <h1>Track Your Applicaitons & Resume</h1>
              <h2>Review your submissions and check AI-powered feedback</h2>
          </div>
      {resumes.length > 0 && (
          <div className="resumes-section">

              {
                  resumes.map((r: Resume) => (
                      <div>
                          <ResumeCard key={r.id} resume={r}/>
                      </div>
                  ))
              }
          </div>
      )}
      </section>
      </main>
}
