// Design ground truth: keep one shared CyberSafe shell across every route so the quiz feels like part of the same reporting desk, not a separate template.
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import SiteShell from "./components/SiteShell";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import InfoPage from "./pages/InfoPage";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <SiteShell>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/report"><InfoPage eyebrow="Report & respond" title="Start with the evidence." body="For suspected financial fraud, call 1930 immediately. Preserve transaction IDs, messages, screenshots, links, and account alerts before completing the official report." actionLabel="Open the official portal" actionHref="https://cybercrime.gov.in/" /></Route>
        <Route path="/guide"><InfoPage eyebrow="Cyber Safety Guide" title="Small habits. Stronger protection." body="Verify unexpected requests independently, use unique passwords and multi-factor authentication, limit personal information online, and keep a clear evidence trail when something feels wrong." actionLabel="Take the awareness quiz" actionHref="/quiz" /></Route>
        <Route path="/contact"><InfoPage eyebrow="Contact" title="Keep the next step clear." body="For active financial fraud, call 1930. For formal cybercrime reporting, use the official national portal. This educational interface does not replace emergency services or law-enforcement intake." actionLabel="Call 1930" actionHref="tel:1930" /></Route>
        <Route path="/dashboard"><InfoPage eyebrow="Analytics" title="Follow the signal, not the noise." body="Use trusted public advisories and official reporting guidance when making decisions. This study interface intentionally avoids inventing statistics or representing itself as a government system." actionLabel="Return to awareness" actionHref="/#awareness" /></Route>
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </SiteShell>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
