import { RefObject, useReducer, useRef } from 'react';
import { Keyboard } from 'react-native';
import i18n from 'utils/i18n/i18n';

type FormItemKey = string;

interface FormControlItem {
  name: string;
  value: string;
  validateFunc?: (value: string, formValue: Record<FormItemKey, string>) => string[];
  require?: boolean;
  lastFieldAction?: () => void;
  validateOn?: string[];
}

export interface FormState {
  index: number;
  requireItems: Record<string, boolean>;
  isValidated: Record<FormItemKey, boolean>;
  config: Record<FormItemKey, FormControlItem>;
  refs: Record<FormItemKey, RefObject<any>>;
  labels: Record<FormItemKey, string>;
  data: Record<FormItemKey, string>;
  errors: Record<FormItemKey, string[]>;
}

interface FormControlAction {
  type: string;
  payload: { fieldName: string; value: string };
}

function initForm(initData: Record<FormItemKey, FormControlItem>) {
  const formState: FormState = {
    config: initData,
    index: 0,
    requireItems: {},
    isValidated: {},
    refs: {},
    labels: {},
    data: {},
    errors: {},
  };

  Object.entries(initData).forEach(([k, d]) => {
    formState.refs[k] = useRef(null);
    formState.labels[k] = d.name;
    formState.data[k] = d.value;
    formState.errors[k] = [];
    formState.requireItems[k] = !!d.require;
  });

  return formState;
}

function formReducer(state: FormState, action: FormControlAction) {
  switch (action.type) {
    case 'change_value':
      let fireUpdate = false;
      const { fieldName, value } = action.payload;
      const validateFunction = state.config[fieldName].validateFunc;
      let isValidated = false;

      if (value && value.length) {
        if (validateFunction) {
          state.errors[fieldName] = validateFunction(value, state.data);
          isValidated = !state.errors[fieldName].length;
        } else {
          isValidated = true;
        }
      } else {
        if (state.requireItems[fieldName]) {
          state.errors[fieldName] = [i18n.warningMessage.requireMessage];
        } else {
          isValidated = true;
        }
      }

      if (state.isValidated[fieldName] !== isValidated) {
        state.isValidated[fieldName] = isValidated;
        fireUpdate = true;
      }

      if (state.errors[fieldName]) {
        fireUpdate = true;
      }
      state.data[fieldName] = value;
      return fireUpdate ? { ...state } : state;
    case 'submit':
      state.index = Object.keys(state.refs).indexOf(action.payload.fieldName) + 1;
      const refList = Object.values(state.refs);
      if (state.index === refList.length) {
        Keyboard.dismiss();
      } else {
        refList[state.index].current?.focus();
      }

      return { ...state };
    default:
      throw new Error();
  }
}

export default function useFormControl(formConfig: Record<FormItemKey, FormControlItem>) {
  const [formState, dispatchForm] = useReducer(formReducer, initForm(formConfig));

  const onChangeValue = (fieldName: string) => {
    return (currentValue: string) => {
      dispatchForm({ type: 'change_value', payload: { fieldName, value: currentValue } });
    };
  };

  const onSubmitEditing = (fieldName: string) => {
    return () => dispatchForm({ type: 'submit', payload: { fieldName, value: '' } });
  };
  return {
    formState,
    onChangeValue,
    onSubmitEditing,
  };
}
