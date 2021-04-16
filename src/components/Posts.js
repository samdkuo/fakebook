import * as React from "react";

const TextBox = ({ data, handleChange, handleSubmit }) => {
  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(data);
      }}
    >
      <textarea
        name="text"
        onChange={handleChange}
        value={data.text}
        placeholder="What's on your mind?"
      />
      <button type="submit">Post</button>
    </form>
  );
};

const Card = ({ text, date, handleDelete }) => {
  const formatDate = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()} - ${
      hours > 12 ? hours - 12 : hours
    }:${(minutes < 10 ? "0" : "") + minutes} ${hours > 12 ? "pm" : "am"}`;
  };

  return (
    <article className="card">
    <span className="meta">
      <p className="date">{formatDate(date)}</p>
      <button onClick={() => handleDelete(date)}>✕</button>
    </span>
      <p>{text}</p>
    </article>
  );
};

const Posts = () => {
  const [postList, setPostList] = React.useState([]);
  const [data, setData] = React.useState({
    date: new Date(),
    text: "",
  });

  const handleChange = (event) => {
    const target = event.target;
    setData({ ...data, [target.name]: target.value });
  };

  const handleSubmit = () => {
    if (data.text !== "") {
      setPostList([...postList, data]);
    }
    setData({
      date: new Date(),
      text: "",
    });
  };

  const handleDelete = (date) => {
    console.log(date)
    setPostList(postList.filter((item) => item.date !== date));
  };

  return (
    <main className="main">
      <TextBox
        data={data}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <section>
        {postList !== []
          ? postList.map((post, index) => (
              <Card
                text={post.text}
                date={post.date}
                handleDelete={handleDelete}
                key={index}
              />
            ))
          : null}
      </section>
    </main>
  );
};

export default Posts;
