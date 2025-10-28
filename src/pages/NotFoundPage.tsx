import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center gap-10 text-3xl font-bold">
      404 Página Não Encontrada
      <Link
        to="/evento/em-andamento"
        className="bg-white border-2 w-50 text-center rounded-md"
      >
        Voltar para HomePage
      </Link>
    </div>
  );
}
