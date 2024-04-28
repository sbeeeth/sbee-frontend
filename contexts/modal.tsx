import React, {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState
} from 'react'

import { InfoModal, InfoModalProps } from '@components/Modal'

export enum ModalType {
  INFO_MODAL = 'InfoModal'
}

const MODAL_COMPONENTS = {
  [ModalType.INFO_MODAL]: InfoModal
}

type ModalProps = InfoModalProps | undefined

type ModalStore = { type: ModalType | null; props?: ModalProps }

export interface ModalContextProps {
  store: ModalStore
  isModalShown: (modal: ModalType) => boolean
  showModal: <T extends ModalProps>(modal: ModalType, props?: T) => void
  hideModal: () => void
}

const defaultContext: ModalContextProps = {
  store: { type: null, props: undefined },
  isModalShown: () => false,
  showModal: () => null,
  hideModal: () => null
}

export const ModalContext = createContext<ModalContextProps>(defaultContext)

export const ModalProvider: React.FC<{ children?: ReactNode }> = ({
  children
}) => {
  const [store, setStore] = useState<ModalStore>(defaultContext.store)

  const isModalShown = useCallback(
    (modal: ModalType) => {
      return modal === store.type
    },
    [store]
  )

  const showModal = useCallback(
    <T extends ModalProps>(type: ModalType, props?: T) => {
      setStore({ ...store, type, props })
    },
    [store]
  )

  const hideModal = useCallback(
    () => setStore({ type: null, props: undefined }),
    []
  )

  const renderComponent = () => {
    if (!store.type) {
      return null
    }

    const ModalComponent = MODAL_COMPONENTS[store.type]
    return <ModalComponent {...(store.props as any)} onClose={hideModal} /> // eslint-disable-line
  }

  return (
    <ModalContext.Provider
      value={{
        ...defaultContext,
        store,
        isModalShown,
        showModal,
        hideModal
      }}
    >
      {renderComponent()}
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
