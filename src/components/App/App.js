import "./App.css";
import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Root = styled.div``;

const Wrapper = styled.div`
  max-width: 561px;
  background: #ffffff;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  border-top: solid 8px #fad312;
  margin: 10% auto;
  padding: 54px 42px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin: 0;
`;

const Description = styled.p`
  margin-top: 35px;
  font-size: 14px;
  line-height: 20px;
`;
const Caution = styled.p`
  font-size: 16px;
  color: #e74149;
  margin-top: 22px;
`;

const InputTitle = styled.div`
  margin-top: 40px;
  font-size: 20px;
  ${(props) =>
    props.$required &&
    `
      &:after {
        content: ' *';
        color: red;
      }
    `}
`;

const InputArea = styled.div`
  position: relative;

  & input {
    display: flex;
    margin-top: 20px;
    width: 200px;
    height: 30px;
    border: solid 1px #d0d0d0;
    color: black;
    font-size: 16px;
    align-items: center;
    padding: 5px;
  }
`;

const Remark = styled.div`
  font-size: 14px;
  margin-top: 8px;
`;

const Warning = styled.div`
  display: none;
  position: absolute;
  top: 40px;
  color: red;
  font-size: 14px;
  ${(props) =>
    props.$display &&
    `
      display: block;
    `}
`;

const TypeOption = styled.div`
  margin-top: 24px;
  font-size: 14px;
  position: relative;

  & div {
    margin-top: 10px;
    & label {
      margin-left: 10px;
    }
  }
`;

const Button = styled.button`
  border-radius: 3px;
  color: black;
  font-size: 15px;
  padding: 14px 30px;
  background: #fad312;
  margin-top: 50px;
  border: none;
  cursor: pointer;
`;

const Footer = styled.div`
  background: black;
  color: #999999;
  font-size: 13px;
  text-align: center;
  padding: 24px 12px;
  width: 100%;
`;

function ApplyForm({
  name,
  type,
  zh,
  stateName,
  handleEvent,
  isError,
  errorMessage,
}) {
  return (
    <div>
      <InputTitle $required={stateName.required}>{zh}</InputTitle>
      {name === "others" && <Remark>對活動的一些建議</Remark>}
      <InputArea>
        <input type={type} value={stateName.value} onChange={handleEvent} />
        <Warning $display={errorMessage}>{isError && "此欄位為必填"}</Warning>
      </InputArea>
    </div>
  );
}

ApplyForm.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  zh: PropTypes.string,
  stateName: PropTypes.object,
  handleEvent: PropTypes.func,
  isError: PropTypes.bool,
  errorMessage: PropTypes.bool,
};

function ApplyFormOptions({
  name,
  options,
  zh,
  stateName,
  handleEvent,
  isError,
  errorMessage,
}) {
  return (
    <div>
      <InputTitle $required={stateName.required}>{zh}</InputTitle>
      <TypeOption>
        {options.map((option, index) => {
          const value = index + 1;
          return (
            <div key={index}>
              <label>
                <input
                  type="radio"
                  name={name}
                  value={value}
                  onChange={handleEvent}
                  checked={Number(stateName.value) === value}
                />
                {option}
              </label>
            </div>
          );
        })}
        <Warning $display={errorMessage}>{isError && "此欄位為必填"}</Warning>
      </TypeOption>
    </div>
  );
}

ApplyFormOptions.propTypes = {
  name: PropTypes.string,
  options: PropTypes.object,
  zh: PropTypes.string,
  stateName: PropTypes.object,
  handleEvent: PropTypes.func,
  isError: PropTypes.bool,
  errorMessage: PropTypes.bool,
};

function App() {
  const [nickname, setNickname] = useState({ value: "", required: true });
  const [email, setEmail] = useState({ value: "", required: true });
  const [cellphone, setCellphone] = useState({ value: "", required: true });
  const [type, setType] = useState({ value: "", required: true });
  const [howToKnow, setHowToKnow] = useState({ value: "", required: true });
  const [others, setOthers] = useState({ value: "", required: false });

  const [isError, setIsError] = useState({
    nickname: nickname.required,
    email: email.required,
    cellphone: cellphone.required,
    type: type.required,
    howToKnow: howToKnow.required,
    others: others.required,
  });
  const [errorMessage, setErrorMessage] = useState(false);

  const handleNicknameChange = (e) => {
    setNickname({
      ...nickname,
      value: e.target.value,
    });
    if (nickname.required) {
      setIsError({ ...isError, nickname: false });
    }
  };

  const handleEmailChange = (e) => {
    setEmail({
      ...email,
      value: e.target.value,
    });
    if (email.required) {
      setIsError({ ...isError, email: false });
    }
  };

  const handleCellphoneChange = (e) => {
    setCellphone({
      ...cellphone,
      value: e.target.value,
    });
    if (cellphone.required) {
      setIsError({ ...isError, cellphone: false });
    }
  };

  const handleTypeChange = (e) => {
    setType({
      ...type,
      value: e.target.value,
    });
    if (type.required) {
      setIsError({ ...isError, type: false });
    }
  };

  const handleHowToKnowChange = (e) => {
    setHowToKnow({
      ...howToKnow,
      value: e.target.value,
    });
    if (howToKnow.required) {
      setIsError({ ...isError, howToKnow: false });
    }
  };

  const handleOthersChange = (e) => {
    setOthers({
      ...others,
      value: e.target.value,
    });
    if (others.required) {
      setIsError({ ...isError, others: false });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      isError.nickname ||
      isError.email ||
      isError.cellphone ||
      isError.type ||
      isError.howToKnow ||
      isError.others
    ) {
      setErrorMessage(true);
      return;
    }

    alert(`
      暱稱： ${nickname.value}
      電子郵件： ${email.value}
      手機號碼： ${cellphone.value}
      報名類型： ${
        type.value === "1" ? "躺在床上用想像力實作" : "趴在地上滑手機找現成的"
      }
      怎麼知道這個活動的： ${howToKnow.value}
      其他： ${others.value}
    `);

    setNickname({ ...nickname, value: "" });
    setEmail({ ...email, value: "" });
    setCellphone({ ...cellphone, value: "" });
    setType({ ...type, value: "" });
    setHowToKnow({ ...howToKnow, value: "" });
    setOthers({ ...others, value: "" });
    setErrorMessage(false);
    setIsError({
      nickname: nickname.required,
      email: email.required,
      cellphone: cellphone.required,
      type: type.required,
      howToKnow: howToKnow.required,
      others: others.required,
    });
  };

  return (
    <Root>
      <Wrapper>
        <Title>新拖延運動報名表單</Title>
        <Description>
          活動日期：2020/12/10 ~ 2020/12/11
          <br />
          活動地點：台北市大安區新生南路二段1號
        </Description>
        <Caution>* 必填</Caution>
        <form onSubmit={handleSubmit}>
          <ApplyForm
            name="nickname"
            type="text"
            zh="暱稱"
            stateName={nickname}
            handleEvent={handleNicknameChange}
            isError={isError.nickname}
            errorMessage={errorMessage}
          />
          <ApplyForm
            name="email"
            type="text"
            zh="電子郵件"
            stateName={email}
            handleEvent={handleEmailChange}
            isError={isError.email}
            errorMessage={errorMessage}
          />
          <ApplyForm
            name="cellphone"
            type="text"
            zh="手機"
            stateName={cellphone}
            handleEvent={handleCellphoneChange}
            isError={isError.cellphone}
            errorMessage={errorMessage}
          />
          <ApplyFormOptions
            name="type"
            zh="報名類型"
            options={["躺在床上用想像力實作", "趴在地上滑手機找現成的"]}
            handleEvent={handleTypeChange}
            stateName={type}
            isError={isError.type}
            errorMessage={errorMessage}
          />
          <ApplyForm
            name="howToKnow"
            type="text"
            zh="怎麼知道這個活動的？"
            stateName={howToKnow}
            handleEvent={handleHowToKnowChange}
            isError={isError.howToKnow}
            errorMessage={errorMessage}
          />
          <ApplyForm
            name="others"
            type="text"
            zh="其他"
            stateName={others}
            handleEvent={handleOthersChange}
            isError={isError.others}
            errorMessage={errorMessage}
          />
          <Button type="submit">提交</Button>
        </form>
        <Description>請勿透過表單送出您的密碼。</Description>
      </Wrapper>
      <Footer>© 2020 © Copyright. All rights Reserved.</Footer>
    </Root>
  );
}

export default App;
