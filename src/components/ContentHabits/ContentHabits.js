import { Content, Header, Body, WeekButtons, Habit, Trash } from "./styled";
import { BsTrash } from "react-icons/bs";

export default function ContentHabitsAdd() {
  return (
    <Content>
      <Header>
        <h2>Meus hábitos</h2>
        <button>+</button>
      </Header>
      <Body>
        <Habit>
          <Trash>
            <h4>Ler um livro por mês</h4>
            <BsTrash />
          </Trash>
          <WeekButtons>
            <button className="buttons">D</button>
            <button className="buttons">S</button>
            <button className="buttons">T</button>
            <button className="buttons">Q</button>
            <button className="buttons">Q</button>
            <button className="buttons">S</button>
            <button className="buttons">S</button>
          </WeekButtons>
        </Habit>
      </Body>
    </Content>
  );
}
