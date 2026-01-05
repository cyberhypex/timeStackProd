export function NegativeButton({ text, onClick }) {
    return (
        <button
            onClick={onClick}
            className="
                bg-red-500 
                text-white 
                px-5 
                py-2.5 
                rounded-lg 
                shadow-md 
                hover:bg-red-600
                active:scale-95 
                transition-all 
                duration-200
            "
        >
            {text}
        </button>
    );
}