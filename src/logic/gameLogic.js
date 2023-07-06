export const checkIfPresent = (scoreStack, id) => {
  return scoreStack.some((item) => item.id === id);
};

export const algorithm = (stack, item) => {
  let scoreStack = structuredClone(stack);
  if (!checkIfPresent(scoreStack, item.id)) {
    scoreStack.push(item);
  }

  let flag = false;

  if (scoreStack.length % 2 === 0) {
    if (item.value !== scoreStack[scoreStack.length - 2].value) {
      flag = true;
    }
  }

  return { scoreStack, isPop: flag };
};

export const checkForWin = (stack, cardSize) => {
  return stack.length === cardSize;
};
