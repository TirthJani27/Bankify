"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../server/appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({
  data,
}: {
  data: { email: string; password: string };
}) => {
  try {
    const { account } = await createAdminClient();
    const res = await account.createEmailPasswordSession(
      data.email,
      data.password
    );
    return parseStringify(res);
  } catch {
    console.log("Error");
  }
};

export const signUp = async (userData: SignUpParams) => {
  try {
    const { account } = await createAdminClient();
    const newUserAccount = await account.create(
      ID.unique(),
      userData.email,
      userData.password,
      `${userData.firstName} ${userData.lastName}`
    );

    const session = await account.createEmailPasswordSession(
      userData.email,
      userData.password
    );

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return parseStringify(newUserAccount);
  } catch {
    console.log("Error");
  }
};
export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();

    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();
    (await cookies()).delete("appwrite-session");
    await account.deleteSession("current");
  } catch {
    return null;
  }
};
