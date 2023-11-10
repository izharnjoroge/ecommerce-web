import { Link } from "react-router-dom";
import { menu } from "../../data";
import "./sidebar.scss";

const Sidebar = () => {
  return (
    <div className="menu">
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem) => (
            <Link to={listItem.url} className="listItem" key={listItem.id}>
              <img
                src={listItem.icon}
                alt=""
                height={20}
                width={20}
                className="icons"
              />
              <span className="listItemTitle">{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
