let read_numbers name : int list =
  let ic = open_in name in
  let try_read () =
    try Some (input_line ic) with End_of_file -> None in
  let rec loop acc = match try_read () with
    | Some s -> loop (int_of_string s :: acc)
    | None -> close_in ic; List.rev acc in
  loop []
;;

(* using first element as pivot *)
(* overflows with 1_000_000 numbers *)
let rec quicksort = function
    [] -> []
    | piv::xs -> let subs, sups = List.partition (fun x -> x <= piv) xs in
            (quicksort subs) @ (piv::(quicksort sups))

;;

let display ns = List.map print_endline (List.map string_of_int ns) ;;
let xs = read_numbers "numbers.txt" ;;
print_endline "loaded numbers" ;;
print_int (List.hd (quicksort xs)) ; print_endline "" ;;
