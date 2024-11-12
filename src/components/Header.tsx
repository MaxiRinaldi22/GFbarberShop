"use client";

import { useState } from "react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header
      className={
        mobileMenuOpen
          ? "z-999 absolute left-0 top-0"
          : "bg-primary-color fixed left-0 top-0 z-50 flex h-[8vh] w-full items-center justify-between py-10"
      }
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#">
            <h1>JAMSTACK</h1>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="text-light-brown -m-2.5 inline-flex items-center justify-center p-2.5"
          >
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        <PopoverGroup className="hidden lg:flex lg:gap-x-6">
          <Link href="/" className={isActive("/") ? "border-b-2" : ""}>
            Inicio
          </Link>
          <Link
            href="/agenda"
            className={isActive("/agenda") ? "border-b-2" : ""}
          >
            Agenda
          </Link>
        </PopoverGroup>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="bg-primary-color fixed inset-y-0 right-0 z-10 h-[325px] w-full overflow-y-auto sm:ring-1">
          <div className="flex h-[8vh] items-center justify-between p-6 py-10">
            <a href="#">
              <h1>JAMSTACK</h1>
            </a>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-light-brown"
            >
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <div className="flow-root">
            <div
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-full flex-col justify-center gap-1 p-4"
            >
              <Link href="/" className={isActive("/") ? "border-b-2" : ""}>
                Inicio
              </Link>
              <Link
                href="/agenda"
                className={isActive("/agenda") ? "border-b-2" : ""}
              >
                Agenda
              </Link>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

export default Header;