const parseFragment = (label: string, content: string) => {
  return `
    <li>
      <b>${label}:</b>
      ${content}
    </li>
  `;
};

export const parser = (data: Record<string, string>) => {
  const { name, email, youAre, applicationType, start, budget, more } = data;

  return `
    <ul>
      ${parseFragment("Nome", name)}
      ${parseFragment("E-mail", email)}
      ${parseFragment("Eu sou", youAre)}
      ${parseFragment("Tipo de aplicação", applicationType)}
      ${parseFragment("Quando quero iniciar", start)}
      ${parseFragment("Meu budget", budget)}
      ${more && more !== "" && parseFragment("Mais informações", more)}
    </ul>
  `;
};
