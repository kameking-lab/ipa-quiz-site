"use client";
import { useRef, useState } from "react";
import { Pencil } from "lucide-react";
import { savePetCare } from "@/lib/pet/v1/browser-care";
import { hasCustomPetName, normalizePetName, PET_DEFAULT_NAME, PET_NAME_MAX } from "@/lib/pet/v1/name";
import type { PetProfileDocument } from "@/lib/pet/v1/profile";
import styles from "./LearningPetCorner.module.css";

/** "ポチ・ITパスポート" once named, else "ITパスポートのチワワ". */
export function petDisplayName(qualificationLabel: string, name: string | undefined) {
  return hasCustomPetName(name) ? `${name}・${qualificationLabel}` : `${qualificationLabel}の${name ?? PET_DEFAULT_NAME}`;
}

/** The panel heading. Tapping the name edits it in place (own panel only). */
export function PetNameTitle({ id, qualificationLabel, name, document, qualificationId }: {
  id: string; qualificationLabel: string; name: string | undefined;
  /** Null while the pet cannot be saved (not loaded yet / no pet for this qualification). */
  document: PetProfileDocument | null; qualificationId: string | undefined;
}) {
  const [editing, setEditing] = useState(false), [value, setValue] = useState(""), [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const editable = Boolean(document && qualificationId);
  const custom = hasCustomPetName(name);
  const label = petDisplayName(qualificationLabel, name);
  const finish = () => { setEditing(false); setError(""); requestAnimationFrame(() => button.current?.focus({ preventScroll: true })); };
  const save = async () => {
    if (busy || !document || !qualificationId) return;
    const result = normalizePetName(value);
    if (!result.ok) { setError(result.error); return; }
    if (result.name === (name ?? PET_DEFAULT_NAME)) { finish(); return; }
    setBusy(true);
    try { await savePetCare(document, qualificationId, { type: "name", name: result.name }); finish(); }
    catch { setError("保存できませんでした。もう一度お試しください。"); }
    finally { setBusy(false); }
  };
  if (editing) return <form className={styles.nameEdit} onSubmit={event => { event.preventDefault(); void save(); }}>
    <h3 id={id} className="sr-only">{label}</h3>
    <input className={styles.nameInput} aria-label="チワワの名前" value={value} placeholder={PET_DEFAULT_NAME} maxLength={PET_NAME_MAX * 2}
      enterKeyHint="done" autoComplete="off" autoFocus disabled={busy} aria-invalid={error ? true : undefined}
      onChange={event => { setValue(event.target.value); setError(""); }}
      onKeyDown={event => { if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); finish(); } }}
      onBlur={() => { if (!error) void save(); }} />
    {error ? <p role="alert" className={styles.nameError}>{error}</p> : null}
  </form>;
  return <h3 id={id} className={styles.title}>
    {editable ? <button type="button" ref={button} className={styles.nameButton} aria-label={`${label}（名前を変える）`}
      onClick={() => { setValue(custom ? name! : ""); setError(""); setEditing(true); }}>
      <Name custom={custom} name={name} qualificationLabel={qualificationLabel} />
      <Pencil aria-hidden="true" className={styles.pencil} />
    </button> : <Name custom={custom} name={name} qualificationLabel={qualificationLabel} />}
  </h3>;
}

function Name({ custom, name, qualificationLabel }: { custom: boolean; name: string | undefined; qualificationLabel: string }) {
  return custom ? <><span className={styles.petName}>{name}</span><span className={styles.petQualification}>・{qualificationLabel}</span></>
    : <span>{qualificationLabel}の{name ?? PET_DEFAULT_NAME}</span>;
}
