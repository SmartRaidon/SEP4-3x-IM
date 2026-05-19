export async function mockRegister(userData) {
  console.log("MOCK register:", userData);
  await new Promise((x) => setTimeout(x, 800));

  return {
    success: true,
    message: "Mock registration successful!",
  };
}

export async function mockLogin(loginData) {
  console.log("MOCK login:", loginData);
  await new Promise((x) => setTimeout(x, 800));

  return {
    success: true,
    token: `mock-token-${Date.now()}`,
    user: {
      id: 999,
      name: "Mock User",
      email: loginData.email,
    },
  };
}