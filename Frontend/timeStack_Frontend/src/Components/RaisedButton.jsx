export function RaisedButton({ text, onClick }) {
    return (
        <button
            onClick={onClick}
            className="
                bg-blue-500
                text-white
                px-5
                py-2.5
                rounded-lg
                shadow-md
                hover:bg-blue-600
                hover:shadow-lg
                active:scale-95
                transition-all
                duration-200
            "
        >
            {text}
        </button>
    );
}