import "./../../styles/main.scss";
import React, { useEffect, useState } from "react";
import Navigation from "./Navigation.js";
import Icons from "../../img/icons.svg";

const Header = (props) => {
  const [UserInput, setUserInput] = useState("");
  // const [SearchRes, SetSearchRes] = useState([]);
  // const [target, setTarget] = useState("");
  // const [singleRec, setSingleRec] = useState("");
  useEffect(() => {
    props.setReRender("1");
  }, [props.reRender]);

  const InputHandler = (e) => {
    e.preventDefault();
    setUserInput(e.target.value);
  };

  // function setAttribute(att) {
  //   props.setAtt(att);
  // }

  const SearchHandler = async (e) => {
    e.preventDefault();
    const Result = await fetch(`/api/recipes/find?search=${UserInput}`);
    const JsonResult = await Result.json();

    props.setSearchRes(JsonResult);

    if (JsonResult.length < 1) {
      props.setData(false);
    }
  };

  return (
    <header className="header">
      <button className="btn search__btn">
        <svg className="search__icon">
          <use xlinkHref={`${Icons}#icon-donate`}></use>
        </svg>
        <a
          href="https://donate.stripe.com/9AQ6oQ0Es8Lo08g000"
          target="_blank"
          style={{ color: "white", textDecoration: "none" }}
          rel="noreferrer"
        >
          Donate
        </a>
      </button>

      <form className="search" onSubmit={SearchHandler}>
        <input
          type="text"
          className="search__field"
          placeholder="Search over 500,000 recipes..."
          onChange={InputHandler}
        />
        <button className="btn search__btn" type="submit">
          <svg className="search__icon">
            <use xlinkHref={`${Icons}#icon-search`}></use>
          </svg>
          <span>Search</span>
        </button>
      </form>
      <Navigation setAtt={props.setAtt} setReRender={props.setReRender} />
    </header>
  );
};

export default Header;
