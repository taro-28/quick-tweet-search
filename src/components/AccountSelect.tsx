import axios from "axios";
import debounce from "lodash.debounce";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import Async from "react-select/async";
import { AccountSelectOption } from "./AccountSelectOption";
import { Inputs } from "./Body";

type Props = {
  control: Control<Inputs>;
  defaultOptions: Inputs["user"][];
};

type User = {
  name: string;
  screen_name: string;
  profile_image: string;
  verified: boolean;
};

const _getUsers = (
  value: string | null,
  callback: (data: Inputs["user"][]) => void
) => {
  if (!value) return;

  axios
    .get(
      `https://d0ygyd78mb.execute-api.ap-northeast-1.amazonaws.com/default/twitterUserSearch?keyword=${value}`
    )
    .then((response: { data: User[] }) =>
      callback(
        response.data.map((user) => ({
          value: user.screen_name,
          name: user.name,
          image: user.profile_image,
          verified: user.verified,
        }))
      )
    );
};

const getUsers = debounce(_getUsers, 200);

export const AccountSelect: FC<Props> = ({ control, defaultOptions }) => {
  return (
    <Controller
      name="user"
      control={control}
      render={({ field }) => (
        <Async
          {...field}
          loadOptions={getUsers}
          placeholder="Twitter Username"
          isClearable
          cacheOptions
          defaultOptions={defaultOptions}
          formatOptionLabel={(option) => (
            <AccountSelectOption
              name={option.name}
              screenName={option.value}
              image={option.image}
              verified={option.verified}
            />
          )}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: () => null,
          }}
        />
      )}
    />
  );
};
