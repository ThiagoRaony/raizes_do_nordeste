import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import AutoImport from "unplugin-auto-import/vite";

const base = "./";

export default defineConfig({
  define: {
    __BASE_PATH__: JSON.stringify(base),
    __IS_PREVIEW__: JSON.stringify(false),
  },
  plugins: [
    react(),
    AutoImport({
      imports: [
        {
          react: [
            "useState",
            "useEffect",
            "useContext",
            "useCallback",
            "useMemo",
            "useRef",
            "useId",
            "createContext",
            "lazy",
            "memo",
          ],
        },
        {
          "react-router-dom": [
            "useNavigate",
            "useLocation",
            "useParams",
            "useSearchParams",
            "Link",
            "NavLink",
            "Navigate",
            "Outlet",
          ],
        },
      ],
      dts: true,
    }),
  ],
  base,
  build: {
    sourcemap: true,
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});