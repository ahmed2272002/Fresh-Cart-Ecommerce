
    "use server";

    import { getToken } from "@/lib/auth";
import { AddAddressSchemaType, ChangePassSchemaSchemaType, ProfileSchemaType } from "@/lib/schema/profile";

    const baseUrl = process.env.NEXT_PUBLIC_BASIC_URL;

    export async function UpdateLoggedUserData( formData: ProfileSchemaType) {
        const token = await getToken();
        const response = await fetch(
        `${baseUrl}/api/v1/users/updateMe/`,
        {
            method: "PUT",
            body: JSON.stringify( formData ),
            headers: {
  "Content-Type": "application/json",
  ...(token ? { token } : {}),
},
        }
        );
        const data = await response.json();
        return data;
    }



        export async function UpdateLoggedUserPassword( formData: ChangePassSchemaSchemaType) {
        const token = await getToken();
        const response = await fetch(
        `${baseUrl}/api/v1/users/changeMyPassword`,
        {
            method: "PUT",
            body: JSON.stringify( formData ),
            headers: {
  "Content-Type": "application/json",
  ...(token ? { token } : {}),
},
        }
        );
        const data = await response.json();
        return data;
    }




    export async function GetLoggedUserAddresses() {
        const token = await getToken();
        const response = await fetch(
        `${baseUrl}/api/v1/addresses`,
        {
            headers: {
  "Content-Type": "application/json",
  ...(token ? { token } : {}),
},
        }
        );
        const data = await response.json();
        return data;
    }


    export async function AddAddress( formData: AddAddressSchemaType) {
        const token = await getToken();
        const response = await fetch(
        `${baseUrl}/api/v1/addresses`,
        {
            method: "POST",
            body: JSON.stringify( formData ),
            headers: {
  "Content-Type": "application/json",
  ...(token ? { token } : {}),
},
        }
        );
        const data = await response.json();
        return data;
    }



    export async function RemoveAddress(addressId: string) {
        const token = await getToken();
        const response = await fetch(
        `${baseUrl}/api/v1/addresses/${addressId}`,
        {
            method: "DELETE",
            headers: {
  "Content-Type": "application/json",
  ...(token ? { token } : {}),
},
        }
        );
        const data = await response.json();
        return data;
    }