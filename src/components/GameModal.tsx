/* eslint-disable @typescript-eslint/no-empty-function */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function GameModal({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState(true);
  const startButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {}}
        initialFocus={startButtonRef}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-thm-800 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-thm-800">
                    ZTO
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Greetings, humans
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        I am Ziltoid, the Omniscient.
                      </p>
                      <p className="text-sm text-gray-500">
                        I have come far from across the omniverse. You shall
                        fetch me your universe's ultimate cup of coffee, black!
                      </p>
                      <p className="text-md text-gray-700 pt-4">
                        You have 1 Earth minute
                      </p>
                      <p className="text-md text-gray-700">Make it perfect!</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 pt-4">
                  <span className="font-bold">Rules:</span> You only have 3
                  shields, any incorrect answer will remove one shield. If you
                  lose all 3 shields, you lose the game and fail to get the
                  ultimate cup of coffee. If you answer 3 questions correctly,
                  you gain an extra shield.
                </p>
                <p className="text-sm text-gray-500 pt-4">
                  <span className="font-bold">How to play:</span> Use the arrow
                  keys to move the spaceship and press the spacebar to select
                  the correct wormhole to travel to the next planet and get
                  closer to the ultimate cup of coffee.
                </p>
                <div className="mt-5 sm:mt-6">
                  <button
                    ref={startButtonRef}
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-thm-700 px-3 py-2 text-sm font-semibold text-green-500 shadow-sm hover:bg-thm-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-thm-700"
                    onClick={() => {
                      onClose();
                      setOpen(false);
                    }}
                  >
                    Start Game
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
