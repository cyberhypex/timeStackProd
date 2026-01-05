export default function PositiveButton({ text, onClick }) {
    return (
        <button
            onClick={onClick}
            className="
                bg-green-400
                text-white 
                px-5 
                py-2.5 
                rounded-lg 
                shadow-md 
                hover:bg-green-500

                active:scale-95 
                transition-all 
                duration-200
            "
        >
            {text}
        </button>
    );
}