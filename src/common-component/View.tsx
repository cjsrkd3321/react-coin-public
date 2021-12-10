import styled from 'styled-components';

const OverView = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.className === 'false' ? 'space-between' : 'center'};
  background-color: ${(props) => props.theme.textColor};
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const OverViewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.bgColor};
`;

interface IView {
  text: string;
  comment: string;
  isCenter?: boolean;
}

function View({ comment, text, isCenter = false }: IView) {
  return (
    <OverView className={`${isCenter}`}>
      <OverViewItem>{comment}</OverViewItem>
      <OverViewItem>&nbsp;{text}</OverViewItem>
    </OverView>
  );
}

export default View;
