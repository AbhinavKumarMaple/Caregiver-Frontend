import AppRouter from "./router";
import { Toaster } from "sonner";
import { showToast } from "./utils/toast";

function App() {
  showToast("Welcome to the app!", "success");

  return (
    <div className="min-h-screen bg-[#FBFBFB] ">
      <Toaster
        position="bottom-right"
        richColors
        className="z-[999999] mb-20"
        toastOptions={{
          classNames: {
            toast: 'animate-slide-in-right',
          }
        }}
      />
      <AppRouter />
    </div>
  );
}

export default App;
