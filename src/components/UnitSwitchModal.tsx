interface UnitSwitchModalProps {
  visible: boolean;
  unitName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function UnitSwitchModal({ visible, unitName, onConfirm, onCancel }: UnitSwitchModalProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-creme rounded-lg max-w-sm w-full p-6 shadow-lg">
        <div className="text-center mb-4">
          <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3 rounded-full bg-yellow-100 text-yellow-600 text-xl">
            <i className="ri-alert-line" />
          </div>
          <h3 className="text-lg font-semibold text-grafite font-display">
            Mudar de unidade?
          </h3>
        </div>
        <p className="text-sm text-grafite-muted text-center font-body mb-6 leading-relaxed">
          Você tem itens no carrinho da unidade atual. Se continuar para <strong className="text-grafite">{unitName}</strong>, o carrinho será esvaziado e você deverá iniciar um novo pedido.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-md border border-gray-200 text-grafite text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-md bg-terra text-white text-sm font-medium hover:bg-terra-dark transition-colors"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}