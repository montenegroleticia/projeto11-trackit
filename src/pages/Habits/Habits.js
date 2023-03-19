import { useEffect, useState, useContext } from "react";
import InferiorBar from "../../components/InferiorBar/InferiorBar";
import NavBar from "../../components/NavBar/NavBar";
import { URL_BASE } from "../../constants/url";
import axios from "axios";
import { Token } from "../../Hook/context";
import {
  Content,
  Header,
  Body,
  AddHabit,
  WeekButtons,
  Choices,
} from "../../components/ContentHabits/styled";
import ContentHabits from "../../components/ContentHabits/ContentHabits";

export default function Habits() {
  const [listHabits, setListHabits] = useState();
  const [addHabit, setAddHabit] = useState(false);
  const [habitForm, setHabitForm] = useState({ name: "", days: [] });
  const { token } = useContext(Token);

  function handleHabitForm(e) {
    setHabitForm({ ...habitForm, [e.target.name]: e.target.value });
  }

  function addDay(day) {
    const addDays = [...habitForm.days, day];
    const update = { ...habitForm, days: addDays };
    setHabitForm(update);
  }

  function sendForm(e) {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.post(`${URL_BASE}/habits`, habitForm, config);
    promise.then((res) => {
      console.log(res.data);
      setAddHabit(false);
      window.location.reload();
    });
    promise.catch((err) => alert(err.response.data.message));
  }

  function deleteHabit(id) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.delete(`${URL_BASE}/habits/${id}`, config);
    promise.then((res) => {
      console.log(res.data);
      setAddHabit(false);
      window.location.reload();
    });
    promise.catch((err) => alert(err.response.data.message));
  }

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get(`${URL_BASE}/habits`, config);
    promise.then((res) => {
      setListHabits(res.data);
      console.log(res.data);
    });
    promise.catch((err) => console.log(err.response.data.message));
  }, [token]);

  return (
    <>
      <NavBar />
      <Content>
        <Header>
          <h2>Meus hábitos</h2>
          <button
            type="button"
            onClick={() => setAddHabit(true)}
            data-test="habit-create-btn"
          >
            +
          </button>
        </Header>
        <Body>
          {addHabit === true ? (
            <AddHabit onSubmit={sendForm} data-test="habit-create-container">
              <input
                placeholder="nome do hábito"
                type="text"
                name="name"
                value={habitForm.name}
                onChange={handleHabitForm}
                onKeyDown={(e) => {
                  const key = e.key;
                  if (
                    !/^\d$/.test(key) &&
                    key !== "Backspace" &&
                    key !== "Delete"
                  ) {
                    e.preventDefault();
                  }
                }}
                required
                data-test="habit-name-input"
              />
              <WeekButtons>
                <button
                  type="button"
                  className="buttons"
                  onClick={() => addDay(0)}
                  data-test="habit-day"
                >
                  D
                </button>
                <button
                  type="button"
                  className="buttons"
                  onClick={() => addDay(1)}
                  data-test="habit-day"
                >
                  S
                </button>
                <button
                  type="button"
                  className="buttons"
                  onClick={() => addDay(2)}
                  data-test="habit-day"
                >
                  T
                </button>
                <button
                  type="button"
                  className="buttons"
                  onClick={() => addDay(3)}
                  data-test="habit-day"
                >
                  Q
                </button>
                <button
                  type="button"
                  className="buttons"
                  onClick={() => addDay(4)}
                  data-test="habit-day"
                >
                  Q
                </button>
                <button
                  type="button"
                  className="buttons"
                  onClick={() => addDay(5)}
                  data-test="habit-day"
                >
                  S
                </button>
                <button
                  type="button"
                  className="buttons"
                  onClick={() => addDay(6)}
                  data-test="habit-day"
                >
                  S
                </button>
              </WeekButtons>
              <Choices>
                <button
                  onClick={() => setAddHabit(false)}
                  type="button"
                  className="cancel"
                  data-test="habit-create-cancel-btn"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="save"
                  data-test="habit-create-save-btn"
                >
                  Salvar
                </button>
              </Choices>
            </AddHabit>
          ) : (
            ""
          )}
          {listHabits && listHabits.length > 0 ? (
            <ContentHabits listHabits={listHabits} deleteHabit={deleteHabit} />
          ) : (
            <p>
              Você não tem nenhum hábito cadastrado ainda. Adicione um hábito
              para começar a trackear!
            </p>
          )}
        </Body>
      </Content>
      <InferiorBar />
    </>
  );
}
