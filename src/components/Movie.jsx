export default function Movie({ movie, disabled, history, index }) {
  return (
    <div className="card">
      <img src={movie.img} alt={movie.title} />
      <p>{movie.title}</p>
      {disabled ? (
        <button className="disabled">Đặt vé</button>
      ) : (
        <button onClick={() => history.push("/showtime/" + index)}>Đặt vé</button>
      )}
    </div>
  );
}
