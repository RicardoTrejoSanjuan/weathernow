import style from "./Alert.module.css";

export default function Alert({children}: { children: string; }) {
    return (
        <div className={style.contenterror} role="alert">
            <strong>Error:</strong>
            <span>{children}</span>
        </div>
    )
}
